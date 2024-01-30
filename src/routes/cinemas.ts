import { type FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'Zod'

export async function CinemaRoutes(app: FastifyInstance) {
  app.post(
    '/',

    async (request, reply) => {
      const [regions] = await knex('regioes').select('id', 'estado')

      const regionName = regions.estado

      const createCinemasBodySchema = z.object({
        nome_do_cinema: z.string(),
        endereco: z.string(),
        cidade: z.string(),
      })
      const { nome_do_cinema, endereco, cidade } =
        createCinemasBodySchema.parse(request.body)
        
      const checkCityExist = await knex
        .select('*')
        .from('regioes')
        .where('cidade', cidade)
        .first()

      if (!checkCityExist) {
        return await reply.status(400).send({
          error: 'Cidade não cadastrada.',
        })
      }

      await knex('cinemas').insert({
        id: randomUUID(),
        nome_do_cinema,
        endereco,
        estado: regionName,
        cidade,
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
