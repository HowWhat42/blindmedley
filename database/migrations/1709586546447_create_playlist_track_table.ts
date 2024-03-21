import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'playlist_track'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('track_id').references('tracks.id').onDelete('CASCADE')
      table.uuid('playlist_id').references('playlists.id').onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
