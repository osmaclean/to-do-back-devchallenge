import { FastifyInstance } from 'fastify'
import { create } from './create'

export const tasksRoutes = async (app: FastifyInstance) => {
  app.post('/create', create)
  app.put('/update', create)
}
