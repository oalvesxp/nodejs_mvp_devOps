import { TasksRepository } from '@/repositories/tasks.repository'
import { Task } from '@prisma/client'

import { TaskNotFoundError } from './errors/task-not-found.error'

interface CompleteTaskUseCaseRequest {
  id: string
}

interface CompleteTaskUseCaseResponse {
  task: Task | null
}

export class CompleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ id }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
    const taskById = await this.tasksRepository.findById(id)

    if (!taskById) {
      throw new TaskNotFoundError()
    }

    const taskIsCompleted = !!taskById.completed_at
    const completed_at = taskIsCompleted ? null : new Date()

    const task = await this.tasksRepository.complete(id, completed_at)

    return {
      task
    }
  }
}