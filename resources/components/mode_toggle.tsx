import { Moon, Sun } from 'lucide-react'

import { useTheme } from './theme_provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  )
}
