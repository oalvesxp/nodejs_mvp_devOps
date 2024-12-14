import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { UpdateTaskUseCase } from '../update-task.use-case'

export function makeUpdateTaskUseCaseFactory() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new UpdateTaskUseCase(tasksRepository)

  return useCase
}