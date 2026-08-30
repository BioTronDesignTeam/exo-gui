interface MachineSelectorProps {
  machines: string[]
  selected: string
  onSelect: (id: string) => void
}

export default function MachineSelector({ machines, selected, onSelect }: MachineSelectorProps) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Machine</span>
      <span className="pointer-events-none absolute left-3 h-2 w-2 rounded-full bg-emerald-400" />
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none rounded-lg bg-white py-2 pl-7 pr-8 text-sm font-medium text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-slate-700/80"
      >
        {machines.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </label>
  )
}
