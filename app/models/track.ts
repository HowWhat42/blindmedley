import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID, UUID } from 'node:crypto'

import Playlist from './playlist.js'

export default class Track extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare artist: string

  @column()
  declare release_date: string

  @column()
  declare preview_url: string

  @column()
  declare provider: string

  @column()
  declare track_url: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @beforeCreate()
  static async createUUID(track: Track) {
    track.id = randomUUID() as UUID
  }
}
