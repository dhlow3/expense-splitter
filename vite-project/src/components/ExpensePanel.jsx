import { useState } from 'react'
import { useApp } from '../context/AppContext'

const emptyForm = { description: '', amount: '', paidBy: '', splitAmong: [] }

export default function ExpensePanel() {
  const { state, dispatch } = useApp()
  const [form, setForm] = useState(emptyForm)

  const participants = state.participants

  function handleSubmit(e) {
    e.preventDefault()
    const amountCents = Math.round(parseFloat(form.amount) * 100)
    if (!form.description.trim() || !amountCents || !form.paidBy || form.splitAmong.length === 0) return

    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        id: crypto.randomUUID(),
        description: form.description.trim(),
        amount: amountCents,
        paidBy: form.paidBy,
        splitAmong: form.splitAmong,
      },
    })
    setForm({ ...emptyForm, paidBy: form.paidBy, splitAmong: participants.map(p => p.id) })
  }

  function toggleSplit(id) {
    setForm(f => ({
      ...f,
      splitAmong: f.splitAmong.includes(id)
        ? f.splitAmong.filter(x => x !== id)
        : [...f.splitAmong, id],
    }))
  }

  function selectAllSplit() {
    setForm(f => ({ ...f, splitAmong: participants.map(p => p.id) }))
  }

  const nameById = id => participants.find(p => p.id === id)?.name ?? id

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Expenses</h2>

      {participants.length < 2 ? (
        <p className="text-sm text-gray-400 italic">Add at least 2 participants first.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={form.paidBy}
            onChange={e => setForm(f => ({ ...f, paidBy: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Paid by...</option>
            {participants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <div className="border border-gray-200 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">Split among</span>
              <button type="button" onClick={selectAllSplit} className="text-xs text-blue-500 hover:underline">
                All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {participants.map(p => (
                <label key={p.id} className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.splitAmong.includes(p.id)}
                    onChange={() => toggleSplit(p.id)}
                    className="accent-blue-500"
                  />
                  {p.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg"
          >
            Add Expense
          </button>
        </form>
      )}

      {state.expenses.length === 0 && (
        <p className="text-sm text-gray-400 italic">No expenses yet.</p>
      )}
      <ul className="space-y-1">
        {state.expenses.map(e => (
          <li key={e.id} className="flex items-start justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
            <div>
              <span className="font-medium text-gray-700">{e.description}</span>
              <span className="text-gray-500 ml-2">${(e.amount / 100).toFixed(2)}</span>
              <div className="text-xs text-gray-400">
                paid by {nameById(e.paidBy)} · split {e.splitAmong.length} ways
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_EXPENSE', payload: { id: e.id } })}
              className="text-gray-400 hover:text-red-500 font-bold ml-2 mt-0.5"
              aria-label="Remove expense"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
