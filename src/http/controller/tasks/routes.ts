import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { getAllTasks } from './getAllTasks'
import { getById } from './getById'
import { remove } from './remove'
import { editFavorite } from './editFavorite'

export const tasksRoutes = async (app: FastifyInstance) => {
  app.post('/create', create)
  app.put('/update/:id', update)
  app.get('/tasks', getAllTasks)
  app.get('/tasks/:id', getById)
  app.delete('/remove/:id', remove)
  app.patch('/tasks/favorite/:id', editFavorite)
}
