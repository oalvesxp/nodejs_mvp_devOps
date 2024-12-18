import { FastifyRequest, FastifyReply } from 'fastify'

export async function healthCheckController(
  _: FastifyRequest,
  rep: FastifyReply,
) {
  return rep.status(200).send()
}