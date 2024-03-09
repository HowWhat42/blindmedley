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
      <main className="px-8 py-20 min-h-screen bg-purple-100 dark:bg-neutral-900">{children}</main>
    </>
  )
}
