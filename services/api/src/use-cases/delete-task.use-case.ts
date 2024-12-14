import { TasksRepository } from '@/repositories/tasks.repository'
import { TaskNotFoundError } from './errors/task-not-found.error'

interface DeleteTaskUseCaseRequest {
  id: string
}

interface DeleteTaskUseCaseResponse {
  deleted: boolean
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const taskById = await this.tasksRepository.findById(id)

    if (!taskById) {
      throw new TaskNotFoundError()
    }

    const deleted = await this.tasksRepository.delete(id)

    return {
      deleted
    }
  }
}