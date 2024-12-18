import { makeFetchTasksUseCaseFactory } from '@/use-cases/factories/make-fetch-tasks.use-case.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const fetchTasksQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export async function fetchTasksController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { page } = fetchTasksQuerySchema.parse(req.query)
  const createTaskUseCase = makeFetchTasksUseCaseFactory()

  const { tasks } = await createTaskUseCase.execute({
    page
  })

  return rep.status(200).send({
    tasks
  })
}