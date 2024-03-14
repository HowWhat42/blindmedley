import Token from '#models/token'
import env from '#start/env'
import { DateTime } from 'luxon'

export default class SpotifyService {
  private static instance: SpotifyService

  constructor() {}

  static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService()
    }
    return SpotifyService.instance
  }

  async getAccessToken() {
    const token = await Token.query().where('name', 'spotify').first()

    if (!token) {
      throw new Error('Token not found')
    }

    return token.accessToken
  }

  async setAccessToken(accessToken: string, refreshToken: string, expiresIn: number) {
    const token = await Token.query().where('name', 'spotify').first()

    if (token) {
      token.accessToken = accessToken
      token.refreshToken = refreshToken
      token.expiresAt = DateTime.local().plus({ seconds: expiresIn })
      await token.save()
    } else {
      await Token.create({
        name: 'spotify',
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: DateTime.local().plus({ seconds: expiresIn }),
      })
    }
  }

  async refreshAccessToken() {
    const token = await Token.query().where('name', 'spotify').first()

    if (!token) {
      throw new Error('Token not found')
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
        client_id: env.get('SPOTIFY_CLIENT_ID'),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = (await response.json()) as {
      access_token: string
      expires_in: number
      refresh_token: string
    }
    await this.setAccessToken(data.access_token, data.refresh_token, data.expires_in)
  }
}
