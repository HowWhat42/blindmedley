import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import Playlist from '#models/playlist'
import Track from '#models/track'
import DeezerService from '#services/deezer_service'
import { ITrack } from '#services/music_service'
import SpotifyService from '#services/spotify_service'

@inject()
export default class PlaylistController {
  constructor(
    private deezerService: DeezerService,
    private spotifyService: SpotifyService
  ) {}

  async index({ inertia }: HttpContext) {
    const rawPlaylists = await Playlist.query().withCount('tracks')

    const playlists = rawPlaylists.map((playlist) => {
      return {
        ...playlist.$attributes,
        tracks_count: playlist.$extras.tracks_count,
      }
    })

    return inertia.render('playlists', {
      playlists,
    })
  }

  async show({ params, inertia }: HttpContext) {
    try {
      const rawPlaylist = await Playlist.query()
        .where('id', params.id)
        .preload('tracks')
        .firstOrFail()

      const playlist = {
        ...rawPlaylist.$attributes,
        tracks: rawPlaylist.tracks,
      }

      return inertia.render('playlist', {
        playlist,
      })
    } catch (error) {
      return inertia.render('not_found')
    }
  }

  async store({ request, response }: HttpContext) {
    const { title } = request.all()

    const playlist = await Playlist.create({
      title,
    })

    return response.redirect().toRoute('playlists.show', {
      id: playlist.id,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const playlist = await Playlist.findOrFail(params.id)

    const { title } = request.all()

    playlist.title = title

    await playlist.save()

    return response.redirect().toRoute('playlists.show', {
      id: playlist.id,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const playlist = await Playlist.findOrFail(params.id)

    await playlist.delete()

    return response.redirect().toRoute('playlists')
  }

  async import(ctx: HttpContext) {
    const { provider } = ctx.request.qs()

    if (provider === 'deezer') {
      return this.importDeezer(ctx)
    }

    if (provider === 'spotify') {
      return this.importSpotify(ctx)
    }
  }

  async importDeezer({ request, response }: HttpContext) {
    const { id } = request.params()
    const { url } = request.body()

    const deezerPlaylist = await this.deezerService.getPlaylist(url)

    const playlist = await Playlist.findOrFail(id)

    for (const track of deezerPlaylist.tracks) {
      await this.attachOrCreateTrack(playlist, track)
    }

    return response.redirect().toRoute('playlists.show', {
      id: playlist.id,
    })
  }

  async attachOrCreateTrack(playlist: Playlist, track: ITrack) {
    const existingTrack = await Track.findBy('provider_id', track.provider_id)

    if (existingTrack) {
      await playlist.related('tracks').attach([existingTrack.id])
      return
    }

    await playlist.related('tracks').create(track)
  }

  async importSpotify({ request, response }: HttpContext) {
    const { id } = request.params()
    const { url } = request.body()

    const spotifyPlaylist = await this.spotifyService.getPlaylist(url)

    const playlist = await Playlist.findOrFail(id)

    for (const track of spotifyPlaylist.tracks) {
      await this.attachOrCreateTrack(playlist, track)
    }

    // TODO: Refactor this into a service
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

  async addTrack({ request, response }: HttpContext) {
    const { playlistId, trackId } = request.all()

    const playlist = await Playlist.findOrFail(playlistId)

    const track = await this.deezerService.getTrack(trackId)

    await playlist.related('tracks').create(track)

    return response.json(playlist)
  }
}
