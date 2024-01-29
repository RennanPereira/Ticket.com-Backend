import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('regions', (table) => {
    table.uuid('id').primary()
    table.text('estate').notNullable()
    table.text('city').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('regions')
}
