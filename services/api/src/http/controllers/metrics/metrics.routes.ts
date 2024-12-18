import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { healthCheckController } from './health-check.controller'

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/health', {
    schema: {
      tags: ['metrics'],
      description: 'Health check',
      operationId: 'healthCheck',
      response: {
        200: z.null()
      }
    }
  }, healthCheckController)

}
