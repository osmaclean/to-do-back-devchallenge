import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const validateInfoBodySchema = z.object({
    title: z.string(),
    message: z.string(),
    favorite: z.boolean().default(false).optional(),
  })

  const { id } = req.params
  const { title, message, favorite } = validateInfoBodySchema.parse(req.body)

  try {
    const searchingTasks = await connectDB.tasks.findFirst({
      where: {
        id,
      },
    })

    if (!searchingTasks)
      return reply.status(404).send({ message: 'Not found tasks!' })

    const updateTask = await connectDB.tasks.update({
      where: { id },
      data: {
        title,
        message,
        favorite,
      },
    })

    reply
      .status(200)
      .send({ data: updateTask, message: 'Updated successfully!' })
  } catch (error) {
    if (error) return reply.status(400).send({ message: error })

    throw error
  }
}
