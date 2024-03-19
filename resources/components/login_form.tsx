import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const defaultValues: Partial<LoginFormValues> = {
    email: '',
    password: '',
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  })

  const onSubmit = (values: LoginFormValues) => {
    router.post('/login', values, {
      onStart: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        toast.success('Logged in')
      },
      onError: (error) => {
        setIsLoading(false)
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-neutral-800">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-neutral-800">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2Icon size={24} className="animate-spin" /> : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
