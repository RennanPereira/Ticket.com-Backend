import fastify from 'fastify'
import { MoviesRoutes } from './routes/movies'
import { RegionRoutes } from './routes/region'
import { CinemaRoutes } from './routes/cinemas'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

app.register(MoviesRoutes, {
  prefix: '/movies',
})

app.register(RegionRoutes, {
  prefix: '/regions',
})

app.register(CinemaRoutes, {
  prefix: '/cinemas',
})
