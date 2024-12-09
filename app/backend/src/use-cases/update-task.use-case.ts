import { TasksRepository } from '@/repositories/tasks.repository'
import { Task } from '@prisma/client'

import { TaskNotFoundError } from './errors/task-not-found.error'
import { MandatoryDataError } from './errors/mandatory-data.error'

interface UpdateTaskUseCaseRequest {
  id: string
  title?: string
  description?: string | null
}

interface UpdateTaskUseCaseResponse {
  task: Task | null
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ id, title, description }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const taskById = await this.tasksRepository.findById(id)

    if (!taskById) {
      throw new TaskNotFoundError()
    }

    if (!title && !description) {
      throw new MandatoryDataError()
    }

    const task = await this.tasksRepository.update({
      id,
      title,
      description
    })

    return {
      task
    }
  }
}