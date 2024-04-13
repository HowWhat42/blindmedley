import { useForm } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import PasswordField from './ui/password_field'

const RegisterForm = () => {
  const form = useForm({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/register', {
      onSuccess: () => {
        toast.success('Registered')
      },
      onError: (error) => {
        toast.error('Failed to register', {
          description: error.message,
        })
      },
    })
  }

  return (
    <Card className="border border-violet-300 bg-violet-100">
      <CardHeader>
        <CardTitle className="font-geist text-neutral-800">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-1">
            <Label>Username</Label>
            <Input
              id="userName"
              placeholder="john.doe"
              type="userName"
              autoCapitalize="none"
              autoComplete="userName"
              autoCorrect="off"
              disabled={form.processing}
              value={form.data.userName}
              onChange={(e) => form.setData('userName', e.target.value)}
            />
          </div>

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

          <div className="flex gap-2">
            <PasswordField
              id="password"
              name="password"
              divClassName="grid gap-1"
              label="Password"
              disabled={form.processing}
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
            />
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              divClassName="grid gap-1"
              label="Confirm password"
              disabled={form.processing}
              value={form.data.password}
              onChange={(e) => form.setData('confirmPassword', e.target.value)}
            />
          </div>

          <Button type="submit" disabled={form.processing}>
            {form.processing ? <Loader2Icon size={24} className="animate-spin" /> : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
