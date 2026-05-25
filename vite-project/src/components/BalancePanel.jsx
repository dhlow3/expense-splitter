import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { calculateSettlements } from '../utils/balanceCalc'

export default function BalancePanel() {
  const { state } = useApp()
  const { participants, expenses } = state

  const settlements = useMemo(
    () => calculateSettlements(participants, expenses),
    [participants, expenses]
  )

  const nameById = id => participants.find(p => p.id === id)?.name ?? id

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Balances</h2>

      {participants.length === 0 && (
        <p className="text-sm text-gray-400 italic">Add participants and expenses to see balances.</p>
      )}

      {participants.length > 0 && settlements.length === 0 && expenses.length > 0 && (
        <p className="text-sm text-green-600 font-medium">All settled up!</p>
      )}

      {settlements.length > 0 && (
        <ul className="space-y-2">
          {settlements.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-sm bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              <span className="font-medium text-gray-700">{nameById(s.fromId)}</span>
              <span className="text-gray-400">owes</span>
              <span className="font-medium text-gray-700">{nameById(s.toId)}</span>
              <span className="ml-auto font-semibold text-amber-700">
                ${(s.amountCents / 100).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
