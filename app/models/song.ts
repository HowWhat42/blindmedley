import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Playlist from './playlist.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare artist: string

  @column()
  declare preview_url: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>
}
