import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { FetchTasksUseCase } from '../fetch-tasks.use-case'

export function makeFetchTasksUseCaseFactory() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new FetchTasksUseCase(tasksRepository)

  return useCase
}