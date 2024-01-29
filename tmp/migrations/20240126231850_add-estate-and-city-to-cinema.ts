import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cinemas', (table) => {
    table.text('estate').after('address')
    table.text('city').after('estate')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cinemas', (table) => {
    table.dropColumn('estate')
    table.dropColumn('city')
  })
}
