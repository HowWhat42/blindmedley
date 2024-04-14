import Header from './header'

interface Props {
  children: React.ReactNode
  user?: any
}

export function Layout({ children, user }: Props) {
  return (
    <>
      <Header user={user} />
      <main className="min-h-[calc(100vh-64px)] bg-purple-100 p-8 dark:bg-neutral-900">
        {children}
      </main>
    </>
  )
}
