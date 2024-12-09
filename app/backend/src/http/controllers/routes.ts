import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { createTaskController } from './create-task.controller'
import { fetchTasksController } from './fetch-tasks.controller'
import { getTaskController } from './get-task.controller'
import { updateTaskController } from './update-task.controller'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/', {
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

  app.get('/:id', {
    schema: {
      tags: ['tasks'],
      description: 'Get task',
      operationId: 'getTasks',
      response: {
        200: z.object({
          task: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            created_at: z.date(),
            updated_at: z.date(),
            completed_at: z.date().nullable(),
          })
        }),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, getTaskController)

  app.get('/', {
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

  app.put('/:id', {
    schema: {
      tags: ['tasks'],
      description: 'Update tasks',
      operationId: 'updateTasks',
      body: z.object({
        title: z.string().optional(),
        description: z.string().nullable().optional()
      }),
      response: {
        204: z.object({}),
        400: z.object({
          message: z.string()
        }),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, updateTaskController)

  /** todo
   * 
  app.patch('/:id/complete', {}, completeTaskController)
  app.delet('/:id, {}, deleteTaskController)
   */
}