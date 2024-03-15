import Playlist from '#models/playlist'
import DeezerService from '#services/deezer_service'
import SpotifyService from '#services/spotify_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PlaylistController {
  constructor(
    private deezerService: DeezerService,
    private spotifyService: SpotifyService
  ) {}

  async index({ inertia }: HttpContext) {
    const playlists = await Playlist.all()

    return inertia.render('playlists', {
      playlists,
    })
  }

  async show({ params, inertia }: HttpContext) {
    const playlist = await Playlist.find(params.id)

    return inertia.render('playlist', {
      playlist,
    })
  }

  async importDeezer({ request, response }: HttpContext) {
    const { playlistId } = request.all()

    const deezerPlaylist = await this.deezerService.getPlaylist(playlistId)

    const playlist = await Playlist.create({
      title: deezerPlaylist.title,
    })

    await playlist.related('tracks').createMany(deezerPlaylist.tracks)

    return response.redirect().toRoute('playlists.show', {
      id: playlist.id,
    })
  }

  async importSpotify({ request, response }: HttpContext) {
    const { playlistId } = request.all()

    const spotifyPlaylist = await this.spotifyService.getPlaylist(playlistId)

    const playlist = await Playlist.create({
      title: spotifyPlaylist.title,
    })

    await playlist.related('tracks').createMany(spotifyPlaylist.tracks)

    if (spotifyPlaylist.noPreviewTracks && spotifyPlaylist.noPreviewTracks.length > 0) {
      for (const track of spotifyPlaylist.noPreviewTracks) {
        const result = await this.deezerService.search(track.title)
        if (result) {
          await playlist.related('tracks').create({
            title: result.tracks[0].title,
            artist: result.tracks[0].artist,
            preview_url: result.tracks[0].preview_url,
          })
        }
      }
    }

    return response.redirect().toRoute('playlists.show', {
      id: playlist.id,
    })
  }
}
