import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const validateInfoBodySchema = z.object({
    title: z.string(),
    message: z.string(),
    favorite: z.boolean().default(false).optional(),
  })

  const { title, message, favorite } = validateInfoBodySchema.parse(req.body)

  try {
    const searchingTitle = await connectDB.tasks.findFirst({
      where: {
        title,
      },
    })

    if (searchingTitle)
      return reply.status(401).send({ message: 'Unauthorized!' })
    else {
      const createdTask = await connectDB.tasks.create({
        data: {
          title,
          message,
          favorite,
        },
      })

      reply
        .status(201)
        .send({ data: createdTask, message: 'Created successfully!' })
    }
  } catch (error) {
    if (error) return reply.status(400).send({ message: error })

    throw error
  }
}
