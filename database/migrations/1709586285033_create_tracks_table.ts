import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tracks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('title').notNullable()
      table.string('artist').notNullable()
      table.string('release_date').notNullable()
      table.string('preview_url').notNullable()
      table.string('provider').notNullable()
      table.string('track_url').notNullable()
      table.string('provider_id').notNullable()
      table.string('album')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
