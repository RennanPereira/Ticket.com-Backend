import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function MoviesRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createMoviesBodySchema = z.object({
      movieName: z.string(),
      rating: z.string(),
      parentalRating: z.string(),
      length: z.string(),
      cinemaName: z.string(),
      language: z.enum(['dublado', 'legendado']),
      type: z.enum(['normal', '3d', 'IMAX']),
      city: z.string(),
    })
    const {
      movieName,
      rating,
      parentalRating,
      cinemaName,
      length,
      language,
      type,
      city,
    } = createMoviesBodySchema.parse(request.body)

    const checkCinemaExist = await knex
      .select('*')
      .from('cinemas')
      .where('cinemaName', cinemaName)
      .first()

    if (!checkCinemaExist) {
      return await reply.status(400).send({
        error: 'Cinema não cadastrado.',
      })
    }
    await knex('movies').insert({
      id: randomUUID(),
      movieName,
      rating,
      parentalRating,
      length,
      cinemaName,
      language,
      type,
      city,
    })

    return reply.status(201).send()
  })

  app.get('/:id', async (request) => {
    await knex('movies').select('cinemaName')

    const getMovieParamsSchema = z.object({
      cinemaName: z.string(),
    })

    const params = getMovieParamsSchema.parse(request.query)

    const movies = await knex('movies').where('cinemaName', params.cinemaName)
    return { movies }
  })

  app.delete('/:id', async (request, reply) => {
    await knex('movies').select('id')

    const getMovieParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const params = getMovieParamsSchema.parse(request.params)

    await knex('movies').where('id', params.id).delete()

    return await reply.status(204).send()
  })
}
