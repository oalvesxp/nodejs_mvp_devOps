
import { makeGetTaskUseCaseFactory } from '@/use-cases/factories/make-get-task.use-case.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TaskNotFoundError } from '@/use-cases/errors/task-not-found.error'

const getTaskParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function getTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = getTaskParamsSchema.parse(req.params)

  try {
    const getTaskUseCase = makeGetTaskUseCaseFactory()
    const { task } = await getTaskUseCase.execute({
      id
    })

    return rep.status(200).send({ task })

  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }
  }
}