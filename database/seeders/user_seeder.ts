import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'user@blindmedley.com',
        password: 'Test1234!',
        userName: 'user',
        role: 'user',
      },
      {
        email: 'admin@blindmedley.com',
        password: 'Test1234!',
        userName: 'admin',
        role: 'admin',
      },
    ])
  }
}
