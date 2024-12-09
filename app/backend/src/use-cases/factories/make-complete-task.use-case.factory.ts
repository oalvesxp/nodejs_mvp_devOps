import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { CompleteTaskUseCase } from '../complete-task.use-case'

export function makeCompleteTaskUseCaseFactory() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new CompleteTaskUseCase(tasksRepository)

  return useCase
}