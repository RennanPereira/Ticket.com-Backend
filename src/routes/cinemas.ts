import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function CinemaRoutes(app: FastifyInstance) {
  app.post(
    '/',

    async (request, reply) => {
      const [regions] = await knex('regions').select('id', 'estate')

      const regionName = regions.estate

      const createCinemasBodySchema = z.object({
        cinemaName: z.string(),
        address: z.string(),
        city: z.string(),
      })
      const { cinemaName, address, city } = createCinemasBodySchema.parse(
        request.body,
      )
      const checkCityExist = await knex
        .select('*')
        .from('regions')
        .where('city', city)
        .first()

      if (!checkCityExist) {
        return await reply.status(400).send({
          error: 'Cidade não cadastradaS.',
        })
      }

      await knex('cinemas').insert({
        id: randomUUID(),
        cinemaName,
        address,
        estate: regionName,
        city,
      })

      return reply.status(201).send()
    },
  )

  app.get('/', async () => {
    const cinemas = await knex('cinemas')
    return cinemas
  })

  app.delete('/:id', async (request, reply) => {
    await knex('cinemas').select('id')

    const getRegionParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const params = getRegionParamsSchema.parse(request.params)

    await knex('cinemas').where('id', params.id).delete()

    return await reply.status(204).send()
  })
}
