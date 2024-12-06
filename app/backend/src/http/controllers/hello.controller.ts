import { FastifyReply, FastifyRequest } from 'fastify'

export async function helloWorldController(
  req: FastifyRequest,
  rep: FastifyReply,
) {

  return rep.status(201).send({ message: "Hello World!" })

}