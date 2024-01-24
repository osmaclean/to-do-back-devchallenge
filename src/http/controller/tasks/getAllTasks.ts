import { connectDB } from '@/http/middleware/connectDB'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllTasks(req: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllTasks = await connectDB.tasks.findMany()

    reply
      .status(200)
      .send({ data: getAllTasks, message: 'Tasks successfully listed!' })
  } catch (error) {
    if (error) return reply.status(400).send({ message: error })

    throw error
  }
}
