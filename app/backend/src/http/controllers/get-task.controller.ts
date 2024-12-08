
import { makeGetTaskUseCaseFactory } from '@/use-cases/factories/make-get-task.use-case.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getTaskParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function getTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = getTaskParamsSchema.parse(req.params)
  const getTaskUseCase = makeGetTaskUseCaseFactory()

  console.log(id)

  const { task } = await getTaskUseCase.execute({
    id
  })

  return rep.status(200).send({ task })
}