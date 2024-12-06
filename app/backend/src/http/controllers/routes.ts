import { FastifyInstance } from 'fastify'
import { helloWorldController } from './hello.controller'

export async function helloRoutes(app: FastifyInstance) {
  app.get('/', helloWorldController)
}