import { useState } from 'react'
import TopBar from './components/TopBar'
import LoginScreen from './components/LoginScreen'
import { type ViewMode } from './components/ModeToggle'
import { useAuth } from './auth/context'

// Placeholder until the machine list is fetched from the backend.
const MACHINES = ['TestDummyExo']

function App() {
  const { state } = useAuth()
  const [machine, setMachine] = useState(MACHINES[0])
  const [mode, setMode] = useState<ViewMode>('live')

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        Loading…
      </div>
    )
  }

  if (state.status === 'anon') {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen">
      <TopBar
        machines={MACHINES}
        selectedMachine={machine}
        onSelectMachine={setMachine}
        mode={mode}
        onModeChange={setMode}
      />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {mode === 'live' ? 'Live' : 'Historical'} view —{' '}
          <span className="text-slate-900 dark:text-slate-200">{machine}</span>
        </p>
      </main>
    </div>
  )
}

export default App
