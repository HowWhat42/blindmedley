import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import LoginForm from './login_form'
import RegisterForm from './register_form'

enum AuthDialogTab {
  login = 'login',
  register = 'register',
}

const AuthDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl w-full">
        <Tabs defaultValue={AuthDialogTab.login}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={AuthDialogTab.login}>Login</TabsTrigger>
            <TabsTrigger value={AuthDialogTab.register}>Register</TabsTrigger>
          </TabsList>
          <TabsContent value={AuthDialogTab.login}>
            <LoginForm />
          </TabsContent>
          <TabsContent value={AuthDialogTab.register}>
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
