
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateTaskUseCaseFactory } from '@/use-cases/factories/make-update-task.use-case.factory'
import { TaskNotFoundError } from '@/use-cases/errors/task-not-found.error'
import { MandatoryDataError } from '@/use-cases/errors/mandatory-data.error'

const updateTaskParamsSchema = z.object({
  id: z.string().uuid(),
})

const updateTaskBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
})

export async function updateTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = updateTaskParamsSchema.parse(req.params)
  const { title, description } = updateTaskBodySchema.parse(req.body)

  try {
    const updateTaskUseCase = makeUpdateTaskUseCaseFactory()
    await updateTaskUseCase.execute({
      id,
      title,
      description
    })

    return rep.status(204).send({})

  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }

    if (err instanceof MandatoryDataError) {
      return rep.status(400).send({ message: err.message })
    }

    return rep.status(500).send({ message: 'Internal Server Error' })
  }
}