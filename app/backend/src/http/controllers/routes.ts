import { FastifyInstance } from 'fastify'
import { createTaskController } from './create-task.controller'
import { z } from 'zod'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', {
    schema: {
      tags: ['tasks'],
      description: 'Register a new task',
      operationId: 'createTask',
      body: z.object({
        title: z.string(),
        description: z.string().nullable()
      }),
      response: {
        201: z.object({})
      }
    }
  }, createTaskController)
}