import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function remove(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params
    const getByTaskId = await connectDB.tasks.findFirst({
      where: {
        id,
      },
    })

    if (!getByTaskId)
      return reply.status(404).send({ message: 'Not found tasks!' })

    const deletedTask = await connectDB.tasks.delete({
      where: {
        id,
      },
    })

    reply
      .status(200)
      .send({ data: deletedTask, message: 'Task deleted successfully!' })
  } catch (error) {
    if (error) return reply.status(400).send({ message: error })

    throw error
  }
}
