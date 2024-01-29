import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cinemas', (table) => {
    table.uuid('id').primary()
    table.text('cinemaName').notNullable()
    table.text('address').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cinemas')
}
