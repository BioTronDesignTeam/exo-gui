import MachineSelector from './MachineSelector'
import ModeToggle, { type ViewMode } from './ModeToggle'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'

interface TopBarProps {
  machines: string[]
  selectedMachine: string
  onSelectMachine: (id: string) => void
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export default function TopBar({
  machines,
  selectedMachine,
  onSelectMachine,
  mode,
  onModeChange,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
      <div className="grid grid-cols-3 items-center px-6 py-3">
        {/* Left: machine selector */}
        <div className="justify-self-start">
          <MachineSelector machines={machines} selected={selectedMachine} onSelect={onSelectMachine} />
        </div>

        {/* Center: Live / Historical toggle */}
        <div className="justify-self-center">
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>

        {/* Right: theme toggle + user menu */}
        <div className="flex items-center gap-2 justify-self-end">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
