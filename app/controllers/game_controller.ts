import { HttpContext } from '@adonisjs/core/http'

import Playlist from '#models/playlist'
import Track from '#models/track'

import { levenshtein, textSanitizer } from '../lib/utils.js'

export default class GameController {
  async newGame({ request }: HttpContext) {
    const { playlistId } = request.params()

    const playlist = await Playlist.findOrFail(playlistId)

    const tracks = await playlist.related('tracks').query()

    const shuffledTracks = tracks.sort(() => 0.5 - Math.random())

    const tracksCount = shuffledTracks.length < 10 ? shuffledTracks.length : 10

    const tracksToPlay = shuffledTracks.slice(0, tracksCount - 1)

    const game = {
      playlist,
      tracks: tracksToPlay,
    }

    return game
  }

  async checkGuess({ request, response }: HttpContext) {
    const { trackId } = request.params()
    const { guess } = request.qs()

    const track = await Track.findOrFail(trackId)

    const sanitizedGuess = textSanitizer(guess)

    const sanitizedTitle = textSanitizer(track.title)
    const sanitizedArtist = textSanitizer(track.artist)

    const titleLevenshteinDistance = levenshtein(sanitizedTitle, sanitizedGuess)
    const artistLevenshteinDistance = levenshtein(sanitizedArtist, sanitizedGuess)

    let foundTitle = false
    let foundArtist = false

    if (titleLevenshteinDistance < 3 && artistLevenshteinDistance < 3) {
      foundTitle = true
      foundArtist = true
    }

    if (titleLevenshteinDistance < 3) {
      foundTitle = true
    }

    if (artistLevenshteinDistance < 3) {
      foundArtist = true
    }

    return response.json({ foundTitle, foundArtist })
  }
}
