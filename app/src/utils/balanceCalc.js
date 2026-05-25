function computeNetBalances(participants, expenses) {
  const balances = new Map(participants.map(p => [p.id, 0]))

  for (const expense of expenses) {
    const { amount, paidBy, splitAmong } = expense
    const share = Math.floor(amount / splitAmong.length)
    const remainder = amount - share * splitAmong.length

    balances.set(paidBy, (balances.get(paidBy) ?? 0) + amount)
    for (const pid of splitAmong) {
      balances.set(pid, (balances.get(pid) ?? 0) - share)
    }
    // payer absorbs rounding remainder
    balances.set(paidBy, (balances.get(paidBy) ?? 0) - remainder)
  }

  return balances
}

export function calculateSettlements(participants, expenses) {
  const balances = computeNetBalances(participants, expenses)

  const creditors = []
  const debtors = []

  for (const [id, bal] of balances) {
    if (bal > 0) creditors.push({ id, bal })
    else if (bal < 0) debtors.push({ id, bal })
  }

  creditors.sort((a, b) => b.bal - a.bal)
  debtors.sort((a, b) => a.bal - b.bal)

  const settlements = []

  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0]
    const debtor = debtors[0]
    const settle = Math.min(creditor.bal, -debtor.bal)

    settlements.push({ fromId: debtor.id, toId: creditor.id, amountCents: settle })

    creditor.bal -= settle
    debtor.bal += settle

    if (creditor.bal === 0) creditors.shift()
    if (debtor.bal === 0) debtors.shift()
  }

  return settlements
}
