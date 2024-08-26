import { HttpContext } from '@adonisjs/core/http'

import Playlist from '#models/playlist'

export default class GameController {
  async newGame({ request, inertia }: HttpContext) {
    const { playlistId } = request.params()

    const playlist = await Playlist.findOrFail(playlistId)

    const tracks = await playlist.related('tracks').query()

    const shuffledTracks = tracks.sort(() => 0.5 - Math.random())

    const tracksCount = shuffledTracks.length < 10 ? shuffledTracks.length : 10

    const tracksToPlay = shuffledTracks.slice(0, tracksCount)

    return inertia.render('games/play', {
      playlist,
      tracks: tracksToPlay,
    })
  }
}
