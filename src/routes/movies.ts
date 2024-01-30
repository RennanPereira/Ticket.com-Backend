import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function MoviesRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createMoviesBodySchema = z.object({
      titulo: z.string(),
      genero: z.string(),
      sinopse: z.string(),
      classificacao_etaria: z.string(),
      duracao: z.string(),
      nome_original: z.string(),
      direcao: z.string(),
      distribuicao: z.string(),
      pais_de_origem: z.string(),
      nota_imdb: z.string(),
      nota_rotten_tomatoes: z.string(),
      em_cartaz: z.enum(['1', '0']),
      em_breve: z.enum(['1', '0']),
      nome_do_cinema: z.string(),
      cidade: z.string(),
    })
    const {
      titulo,
      genero,
      sinopse,
      classificacao_etaria,
      duracao,
      nome_original,
      direcao,
      distribuicao,
      pais_de_origem,
      nota_imdb,
      nota_rotten_tomatoes,
      em_cartaz,
      em_breve,
      nome_do_cinema,
      cidade,
    } = createMoviesBodySchema.parse(request.body)

    const checkCinemaExist = await knex
      .select('*')
      .from('cinemas')
      .where('nome_do_cinema', nome_do_cinema)
      .first()

    if (!checkCinemaExist) {
      return await reply.status(400).send({
        error: 'Cinema não cadastrado.',
      })
    }
    await knex('filmes').insert({
      id: randomUUID(),
      titulo,
      genero,
      sinopse,
      classificacao_etaria,
      duracao,
      nome_original,
      direcao,
      distribuicao,
      pais_de_origem,
      nota_imdb,
      nota_rotten_tomatoes,
      em_cartaz,
      em_breve,
      nome_do_cinema,
      cidade,
    })

    return reply.status(201).send()
  })

  app.get('/:id', async (request) => {
    await knex('filmes').select('nome_do_cinema')

    const getMovieParamsSchema = z.object({
      nome_do_cinema: z.string(),
    })

    const params = getMovieParamsSchema.parse(request.query)

    const movies = await knex('filmes').where(
      'nome_do_cinema',
      params.nome_do_cinema,
    )
    return { movies }
  })

  app.delete('/:id', async (request, reply) => {
    await knex('filmes').select('id')

    const getMovieParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const params = getMovieParamsSchema.parse(request.params)

    await knex('filmes').where('id', params.id).delete()

    return await reply.status(204).send()
  })
}
