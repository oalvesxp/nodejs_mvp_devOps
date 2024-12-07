import { MakeCreateTaskUseCaseFactory } from '@/use-cases/factories/make-create-task.use-case.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable()
})

export async function createTaskController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { title, description } = createTaskBodySchema.parse(req.body)
  const createTaskUseCase = MakeCreateTaskUseCaseFactory()

  await createTaskUseCase.execute({
    title,
    description
  })

  rep.status(201).send({})
}