import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { FetchTasksUseCase } from '../fetch-tasks.use-case'

export function MakeFetchTasksUseCaseFactory() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new FetchTasksUseCase(tasksRepository)

  return useCase
}