import { AppProvider } from '../context/AppContext'
import ParticipantPanel from './ParticipantPanel'
import ExpensePanel from './ExpensePanel'
import BalancePanel from './BalancePanel'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Expense Splitter</h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ParticipantPanel />
          <ExpensePanel />
          <BalancePanel />
        </div>
      </div>
    </AppProvider>
  )
}
