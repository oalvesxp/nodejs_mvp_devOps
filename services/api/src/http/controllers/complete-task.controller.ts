
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCompleteTaskUseCaseFactory } from '@/use-cases/factories/make-complete-task.use-case.factory'
import { TaskNotFoundError } from '@/use-cases/errors/task-not-found.error'

const completeTaskParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function completeTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = completeTaskParamsSchema.parse(req.params)

  try {
    const completeTaskUseCase = makeCompleteTaskUseCaseFactory()
    const { task } = await completeTaskUseCase.execute({
      id
    })

    return rep.status(200).send({ task })

  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }
  }
}
