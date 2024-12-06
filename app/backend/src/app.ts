
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

import { helloRoutes } from './http/controllers/routes'

export const app = fastify()

// routes
app.register(helloRoutes)

app.setErrorHandler((error, _, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO : Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return rep.status(500).send({ message: 'Internal server error.' })
})