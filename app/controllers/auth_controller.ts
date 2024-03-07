import User from '#models/user'
import AuthService from '#services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  constructor(private authService: AuthService) {}

  async login({ auth, request, session, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    session.put('authenticated_user', user.id)

    return response.redirect('/')
  }

  async register({ auth, session, request, response }: HttpContext) {
    const { userName, email, password } = request.all()

    const user = await this.authService.createUser({
      userName,
      email,
      password,
      role: 'user',
    })

    await auth.use('web').login(user)

    session.put('authenticated_user', user.id)

    return response.created(user)
  }

  async me({ response, session }: HttpContext) {
    const userId = session.get('authenticated_user')

    if (!userId) {
      return response.status(401)
    }

    const user = await this.authService.getUserById(userId)

    if (!user) {
      return response.status(401)
    }

    return response.ok(user)
  }

  async logout({ session, auth, response }: HttpContext) {
    session.forget('authenticated_user')
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
