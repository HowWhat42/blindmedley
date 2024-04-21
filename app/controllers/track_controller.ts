import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import Track from '#models/track'
import DeezerService from '#services/deezer_service'
import SpotifyService from '#services/spotify_service'

@inject()
export default class PlaylistController {
  constructor(
    private deezerService: DeezerService,
    private spotifyService: SpotifyService
  ) {}

  async show({ params, response }: HttpContext) {
    const track = await Track.find(params.id)

    return response.json(track)
  }

  async search({ request, response }: HttpContext) {
    const { title } = request.qs()

    const deezerTracks = await this.deezerService.search(title)
    const spotifyTracks = await this.spotifyService.search(title)

    const tracks = [...deezerTracks.tracks, ...spotifyTracks.tracks]

    return response.json(tracks)
  }
}
