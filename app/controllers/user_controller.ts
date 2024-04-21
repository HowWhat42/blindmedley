import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { updateVolumeValidator } from '#validators/user_validator'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async updateVolume({ auth, request, response }: HttpContext) {
    const userId = auth.use('web').user?.id

    if (!userId) {
      return response.status(401)
    }

    const { volume } = await request.validateUsing(updateVolumeValidator)

    await this.userService.updateVolume(volume, userId)

    return response.redirect().back()
  }
}
