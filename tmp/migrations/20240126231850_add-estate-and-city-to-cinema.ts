import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cinemas', (table) => {
    table.text('estado').after('endereco')
    table.text('cidade').after('estado')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cinemas', (table) => {
    table.dropColumn('estado')
    table.dropColumn('cidade')
  })
}
