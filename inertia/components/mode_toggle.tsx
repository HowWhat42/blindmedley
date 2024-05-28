import { useTheme } from './theme_provider'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="mx-2 flex items-center justify-end space-x-2 py-2">
      <Label htmlFor="theme-toggle">Theme</Label>
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  )
}
