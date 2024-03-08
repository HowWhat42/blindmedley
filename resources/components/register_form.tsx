import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'

const RegisterFormSchema = z
  .object({
    userName: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const defaultValues: Partial<RegisterFormValues> = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  })

  const onSubmit = (values: RegisterFormValues) => {
    router.post('/register', values, {
      onStart: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    <Card className="bg-violet-100 border border-violet-300">
      <CardHeader>
        <CardTitle className="font-geist text-neutral-800">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-800 text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-800 text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-800 text-base">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-800 text-base">Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoaderIcon size={24} className="animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
