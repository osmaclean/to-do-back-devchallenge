import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function editFavorite(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = req.params

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
        favorite: !searchingTasks.favorite,
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
