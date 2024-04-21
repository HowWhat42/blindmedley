import string from '@adonisjs/core/helpers/string'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID, UUID } from 'node:crypto'

import Track from './track.js'
import User from './user.js'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare cover_url: string | null

  @column()
  declare isPublic: boolean

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Track)
  declare tracks: ManyToMany<typeof Track>

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @beforeCreate()
  static async createUUID(playlist: Playlist) {
    playlist.id = randomUUID() as UUID
  }

  @beforeCreate()
  static async slugify(playlist: Playlist) {
    const slug = string.slug(playlist.title, {
      replacement: '-',
      lower: true,
      strict: true,
    })

    const rows = await Playlist.query()
      .select('slug')
      .where('slug', slug)
      .orWhereRaw('lower(??) like ?', ['slug', `slug-%`])

    if (!rows.length) {
      playlist.slug = slug
      return
    }

    const incrementors = rows.reduce<number[]>((result, row) => {
      const tokens = row.slug.toLowerCase().split(`${slug}-`)

      if (tokens.length < 2) {
        return result
      }

      const increment = Number(tokens.at(1))

      if (!Number.isNaN(increment)) {
        result.push(increment)
      }

      return result
    }, [])

    const increment = incrementors.length > 0 ? Math.max(...incrementors) + 1 : 1

    playlist.slug = `${slug}-${increment}`
  }
}
