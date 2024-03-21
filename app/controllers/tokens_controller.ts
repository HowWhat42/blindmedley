import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import Token from '#models/token'
import env from '#start/env'

export default class TokensController {
  async spotify({ request, response }: HttpContext) {
    const { code } = request.qs()
    const SPOTIFY_CLIENT_ID = env.get('SPOTIFY_CLIENT_ID')
    const SPOTIFY_CLIENT_SECRET = env.get('SPOTIFY_CLIENT_SECRET')

    const res = await fetch(
      `https://accounts.spotify.com/api/token?redirect_uri=http%3A%2F%2Flocalhost%3A3333%2Ftokens%2Fspotify&grant_type=authorization_code&code=${code}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    ).then(
      (res) =>
        res.json() as Promise<{ access_token: string; refresh_token: string; expires_in: number }>
    )

    console.log(res)

    const token = await Token.create({
      name: 'spotify',
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expiresAt: DateTime.now().plus({ seconds: res.expires_in }),
    })

    return response.json(token)
  }
}
