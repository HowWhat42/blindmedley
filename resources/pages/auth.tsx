import AuthDialog from '../components/auth_dialog'

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-8 -mt-40">
      <h1 className="text-6xl font-geist">Blindmedley</h1>
      <AuthDialog />
    </div>
  )
}

export default AuthPage
