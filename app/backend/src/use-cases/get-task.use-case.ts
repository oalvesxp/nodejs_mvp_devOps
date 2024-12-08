import { TasksRepository } from '@/repositories/tasks.repository'
import { Task } from '@prisma/client'

import { TaskNotFoundError } from './errors/task-not-found.error'

interface GetTaskUseCaseRequest {
  id: string
}

interface GetTaskUseCaseResponse {
  task: Task
}

export class GetTaskUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ id }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(id)

    if (!task) {
      throw new TaskNotFoundError()
    }

    return {
      task
    }
  }
}