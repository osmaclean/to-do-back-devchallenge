import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'

export const tasksRoutes = async (app: FastifyInstance) => {
  app.post('/create', create)
  app.put('/update/:id', update)
}
