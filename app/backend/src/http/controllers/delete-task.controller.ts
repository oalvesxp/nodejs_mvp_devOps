
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteTaskUseCaseFactory } from '@/use-cases/factories/make-delete-task.use-case.factory'
import { TaskNotFoundError } from '@/use-cases/errors/task-not-found.error'

const deleteTaskParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function deleteTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = deleteTaskParamsSchema.parse(req.params)

  try {
    const deleteTaskUseCase = makeDeleteTaskUseCaseFactory()
    await deleteTaskUseCase.execute({
      id
    })

    return rep.status(204).send({})

  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }
  }
}
