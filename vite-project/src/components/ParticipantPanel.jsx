import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function ParticipantPanel() {
  const { state, dispatch } = useApp()
  const [name, setName] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_PARTICIPANT', payload: { id: crypto.randomUUID(), name: trimmed } })
    setName('')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Participants</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-lg"
        >
          Add
        </button>
      </form>

      {state.participants.length === 0 && (
        <p className="text-sm text-gray-400 italic">No participants yet.</p>
      )}
      <ul className="space-y-1">
        {state.participants.map(p => (
          <li key={p.id} className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
            <span>{p.name}</span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_PARTICIPANT', payload: { id: p.id } })}
              className="text-gray-400 hover:text-red-500 font-bold ml-2"
              aria-label={`Remove ${p.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
