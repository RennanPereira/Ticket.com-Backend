import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cinemas', (table) => {
    table.uuid('id').primary()
    table.text('nome_do_cinema').notNullable()
    table.text('endereco').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cinemas')
}
