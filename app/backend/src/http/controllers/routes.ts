import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { createTaskController } from './create-task.controller'
import { fetchTasksController } from './fetch-tasks.controller'

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

  app.get('/tasks', {
    schema: {
      tags: ['tasks'],
      description: 'Fetch tasks',
      operationId: 'fetchTasks',
      response: {
        200: z.object({
          tasks: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              created_at: z.date(),
              updated_at: z.date(),
              completed_at: z.date().nullable(),
            })
          )
        })
      }
    }
  }, fetchTasksController)
}