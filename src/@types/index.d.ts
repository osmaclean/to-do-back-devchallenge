import { Tasks } from '@prisma/client'
declare module 'fastify-cors'

export interface MockTasksSchema {
  title: string
  message: string
  favorite: boolean
}
