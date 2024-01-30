import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('filmes', (table) => {
    table.uuid('id').primary().notNullable()
    table.text('titulo').notNullable()
    table.text('genero').notNullable()
    table.text('sinopse').notNullable()
    table.text('classificacao_etaria').notNullable()
    table.text('duracao').notNullable()
    table.text('nome_original').notNullable()
    table.text('direcao').notNullable()
    table.text('distribuicao').notNullable()
    table.text('pais_de_origem').notNullable()
    table.text('nota_imdb').notNullable()
    table.text('nota_rotten_tomatoes').notNullable()
    table.enum('em_cartaz', ['1', '0'])
    table.enum('em_breve', ['1', '0'])
    table.text('nome_do_cinema')
    table.text('cidade')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('filmes')
}
