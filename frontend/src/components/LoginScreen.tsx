import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth/context'

const GitHubMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
)

export default function LoginScreen() {
  const { login, loginGuest } = useAuth()
  const denied = new URLSearchParams(window.location.search).get('auth') === 'denied'

  const [key, setKey] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onGuest = async (e: FormEvent) => {
    e.preventDefault()
    if (!key.trim()) return
    setSubmitting(true)
    setError(false)
    const ok = await loginGuest(key.trim())
    setSubmitting(false)
    if (!ok) setError(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">BioTron Exo Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Sign in with GitHub (BioTron Auth) to view telemetry. Access is limited to
          BioTronDesignTeam members.
        </p>

        {denied && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            Access denied — your GitHub account isn't a BioTronDesignTeam member.
          </p>
        )}

        <button
          type="button"
          onClick={login}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <GitHubMark />
          Sign in with GitHub
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          or
          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <form onSubmit={onGuest} className="space-y-2 text-left">
          <label htmlFor="guest-key" className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Daily guest key
          </label>
          <input
            id="guest-key"
            value={key}
            onChange={(e) => {
              setKey(e.target.value)
              setError(false)
            }}
            placeholder="XXXX-XXXX-XXXX"
            autoComplete="off"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100"
          />
          {error && <p className="text-xs text-red-600 dark:text-red-400">Invalid or expired key.</p>}
          <button
            type="submit"
            disabled={submitting || !key.trim()}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {submitting ? 'Checking…' : 'Continue as guest'}
          </button>
        </form>
      </div>
    </div>
  )
}
