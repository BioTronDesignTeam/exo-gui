import { useEffect, useState } from 'react'
import SegmentedToggle from './SegmentedToggle'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM5 11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1Zm15 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM6.34 6.34a1 1 0 0 1 1.41 0l.71.71A1 1 0 0 1 7.05 8.46l-.71-.71a1 1 0 0 1 0-1.41Zm9.9 9.9a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41ZM17.66 6.34a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.76 16.24a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Z" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const dark = theme === 'dark'
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('darkMode', String(dark))
    } catch {
      // storage may be unavailable (private mode, blocked cookies)
    }
  }, [theme])

  return (
    <SegmentedToggle<Theme>
      ariaLabel="Color theme"
      segmentRem={2.5}
      value={theme}
      onChange={setTheme}
      options={[
        { value: 'light', icon: <SunIcon />, ariaLabel: 'Light mode' },
        { value: 'dark', icon: <MoonIcon />, ariaLabel: 'Dark mode' },
      ]}
    />
  )
}
