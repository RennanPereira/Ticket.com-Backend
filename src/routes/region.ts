import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function RegionRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createRegionBodySchema = z.object({
      estate: z.string(),
      city: z.string(),
    })
    const { estate, city } = createRegionBodySchema.parse(request.body)

    const checkCityExist = await knex
      .select('*')
      .from('regions')
      .where('city', city)
      .first()

    if (checkCityExist) {
      return await reply.status(400).send({
        error: 'Esta região já está cadastrada.',
      })
    }

    await knex('regions').insert({
      id: randomUUID(),
      estate,
      city,
    })
    return reply.status(201).send()
  })

  app.get('/', async () => {
    const regions = await knex('regions')
    return { regions }
  })

  app.delete('/:id', async (request, reply) => {
    const [regions] = await knex('regions').select('id')

    const regionId = regions.id

    await knex('regions').where('id', regionId).delete()

    return await reply.status(204).send()
  })
}
