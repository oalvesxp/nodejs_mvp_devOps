import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { CreateTaskUseCase } from '../create-task.use-case'

export function MakeCreateTaskUseCaseFactory() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new CreateTaskUseCase(tasksRepository)

  return useCase
}