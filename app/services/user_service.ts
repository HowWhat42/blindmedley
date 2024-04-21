import User from '#models/user'

export default class UserService {
  async updateVolume(volume: number, userId: string) {
    const user = User.query().where('id', userId).update({ volume })
    return user
  }
}
