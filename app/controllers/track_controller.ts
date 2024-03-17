import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import Track from '#models/track'

@inject()
export default class PlaylistController {
  constructor() {}

  async show({ params, response }: HttpContext) {
    const track = await Track.find(params.id)

    return response.json(track)
  }
}
