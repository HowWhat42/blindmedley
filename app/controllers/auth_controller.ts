import User from '#models/user'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect('/')
  }

  async register({ auth, request, response }: HttpContext) {
    const { userName, email, password } = request.all()

    const user = await this.authService.createUser({
      userName,
      email,
      password,
      role: 'user',
    })

    await auth.use('web').login(user)

    return response.redirect('/')
  }

  async me({ auth, response }: HttpContext) {
    const userId = auth.use('web').user?.id

    if (!userId) {
      return response.status(401)
    }

    const user = await this.authService.getUserById(userId)

    if (!user) {
      return response.status(401)
    }

    return response.ok(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/auth')
  }
}
