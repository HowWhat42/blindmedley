import Header from './header'

interface Props {
  children: React.ReactNode
  user?: any
}

export function Layout(props: Props) {
  const { children, user } = props

  return (
    <>
      <Header user={user} />
      <main className="min-h-screen bg-purple-100 px-8 py-20 dark:bg-neutral-900">{children}</main>
    </>
  )
}
