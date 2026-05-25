export function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return { ...state, participants: [...state.participants, action.payload] }

    case 'REMOVE_PARTICIPANT': {
      const { id } = action.payload
      return {
        ...state,
        participants: state.participants.filter(p => p.id !== id),
        expenses: state.expenses
          .filter(e => e.paidBy !== id)
          .map(e => ({ ...e, splitAmong: e.splitAmong.filter(pid => pid !== id) }))
          .filter(e => e.splitAmong.length > 0),
      }
    }

    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] }

    case 'REMOVE_EXPENSE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload.id) }

    default:
      return state
  }
}
