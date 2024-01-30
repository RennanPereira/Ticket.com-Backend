import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function RegionRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createRegionBodySchema = z.object({
      estado: z.string(),
      cidade: z.string(),
    })
    const { estado, cidade } = createRegionBodySchema.parse(request.body)

    const checkCityExist = await knex
      .select('*')
      .from('regioes')
      .where('cidade', cidade)
      .first()

    if (checkCityExist) {
      return await reply.status(400).send({
        error: 'Esta região já está cadastrada.',
      })
    }

    await knex('regioes').insert({
      id: randomUUID(),
      estado,
      cidade,
    })
    return reply.status(201).send()
  })

  app.get('/', async () => {
    const regions = await knex('regioes')
    return { regions }
  })

  app.delete('/:id', async (request, reply) => {
    const [regions] = await knex('regioes').select('id')

    const regionId = regions.id

    await knex('regioes').where('id', regionId).delete()

    return await reply.status(204).send()
  })
}
