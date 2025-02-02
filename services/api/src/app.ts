import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  ZodTypeProvider
} from 'fastify-type-provider-zod'

import { ZodError } from 'zod'
import { env } from './env'

import { taskRoutes } from './http/controllers/tasks/tasks.routes'
import { metricsRoutes } from './http/controllers/metrics/metrics.routes'
/** end imports */

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Tasks+ API',
      version: '1.4.1'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: 'docs'
})

// routes
app.register(taskRoutes, { prefix: 'tasks' })
app.register(metricsRoutes, { prefix: 'metrics' })

app.setErrorHandler((error, _, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO : Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return rep.status(500).send({ message: 'Internal server error.' })
})
