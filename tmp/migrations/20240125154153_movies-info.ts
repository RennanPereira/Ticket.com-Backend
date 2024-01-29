import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.uuid('id').primary().notNullable()
    table.text('movieName').notNullable()
    table.text('rating').notNullable()
    table.text('parentalRating').notNullable()
    table.text('length').notNullable()
    table.enum('language', ['dublado', 'legendado'])
    table.enum('type', ['normal', '3d', 'IMAX'])
    table.text('cinemaName')
    table.text('city')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movies')
}
