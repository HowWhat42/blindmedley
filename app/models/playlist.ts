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
}
