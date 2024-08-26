import User from '#models/user'

import Header from './header'

interface Props {
  children: React.ReactNode
  user: User
}

export function Layout({ children, user }: Props) {
  return (
    <>
      <Header user={user} />
      <main className="mt-16 min-h-[calc(100vh-64px)] bg-purple-100 p-8 dark:bg-neutral-900">
        {children}
      </main>
    </>
  )
}
