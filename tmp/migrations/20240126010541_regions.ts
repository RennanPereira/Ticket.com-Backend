import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('regioes', (table) => {
    table.uuid('id').primary()
    table.text('estado').notNullable()
    table.text('cidade').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('regioes')
}
