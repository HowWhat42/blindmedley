import AuthDialog from '../components/auth_dialog'

const AuthPage = () => {
  return (
    <div className="-mt-10 flex h-screen w-full flex-col items-center justify-center gap-8">
      <h1 className="font-geist text-6xl">Blindmedley</h1>
      <AuthDialog />
    </div>
  )
}

export default AuthPage
