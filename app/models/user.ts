import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID, type UUID } from 'node:crypto'

import type { Role } from '#types/user'

import Playlist from './playlist.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare role: Role

  @column()
  declare userName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken: string | null

  @column()
  declare emailVerified: boolean

  @column()
  declare xp: number

  @column()
  declare level: number

  @column()
  declare volume: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Playlist)
  declare playlists: ManyToMany<typeof Playlist>

  @beforeCreate()
  static async createUUID(user: User) {
    user.id = randomUUID() as UUID
  }
}
