import { useForm } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import useError from '#resources/hooks/use_error'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import PasswordField from './ui/password_field'

const LoginForm = () => {
  const form = useForm({
    email: '',
    password: '',
  })

  const error = useError('auth')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/login', {
      onSuccess: () => {
        toast.success('Logged in')
      },
      onError: (error) => {
        toast.error('Failed to login', {
          description: error.message,
        })
      },
    })
  }

  return (
    <Card className="border border-violet-300 bg-violet-100">
      <CardHeader>
        <CardTitle className="font-geist text-neutral-800">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={form.processing}
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
            />
          </div>

          <PasswordField
            id="password"
            name="password"
            divClassName="grid gap-1"
            label="Password"
            disabled={form.processing}
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={form.processing}>
            {form.processing ? <Loader2Icon size={24} className="animate-spin" /> : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
