import { TasksRepository } from '@/repositories/tasks.repository'
import { Task } from '@prisma/client'

interface CreateTaskUseCaseRequest {
  title: string
  description: string | null
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) { }

  async execute({ title, description }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.tasksRepository.create({
      title,
      description
    })

    return {
      task
    }
  }
}