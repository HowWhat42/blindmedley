import db from '@adonisjs/lucid/services/db'

import User from '#models/user'
import type { Role } from '#types/user'

type UserCreate = {
  userName: string
  email: string
  password: string
  role: Role
}

export default class AuthService {
  createUser(params: UserCreate) {
    return db.transaction(async (trx) => {
      const user = await User.create(params, { client: trx })
      return user
    })
  }

  async getUserById(userId: string) {
    return User.query().where('id', userId).first()
  }
}
