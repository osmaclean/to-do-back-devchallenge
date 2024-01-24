import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getById(
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

    reply
      .status(200)
      .send({ data: getByTaskId, message: 'Task successfully listed!' })
  } catch (error) {
    if (error) return reply.status(400).send({ message: error })

    throw error
  }
}
