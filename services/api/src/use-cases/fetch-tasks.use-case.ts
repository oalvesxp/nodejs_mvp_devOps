import { TasksRepository } from '@/repositories/tasks.repository'
import { Task } from '@prisma/client'

interface FetchTasksUseCaseRequest {
  page: number
}

interface FetchTasksUseCaseReponse {
  tasks: Task[]
}

export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ page }: FetchTasksUseCaseRequest): Promise<FetchTasksUseCaseReponse> {
    const tasks = await this.tasksRepository.findMany(page)

    return {
      tasks
    }
  }
}