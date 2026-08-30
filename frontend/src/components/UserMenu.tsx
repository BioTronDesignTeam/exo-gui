import { useAuth } from '../auth/context'
import { useDismissable } from '../hooks/useDismissable'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.31-3.58-6-8-6Z" />
  </svg>
)

export default function UserMenu() {
  const { state, logout } = useAuth()
  const { open, setOpen, ref } = useDismissable<HTMLDivElement>()

  const operator = state.status === 'authed' ? state.operator : null

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-300 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        {operator?.avatar_url ? (
          <img src={operator.avatar_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <UserIcon />
        )}
      </button>

      {open && operator && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-white/10"
        >
          <div className="border-b border-slate-200 px-3 py-2 dark:border-white/10">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              {operator.name || operator.login}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">@{operator.login}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              void logout()
            }}
            className="w-full px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
