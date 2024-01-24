import fastify from 'fastify'
import { ZodError } from 'zod'
import { tasksRoutes } from './http/controller/tasks/routes'

export const app = fastify()

app.register(tasksRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
