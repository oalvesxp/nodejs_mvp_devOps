import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'

import { randomUUID } from 'crypto'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async findMany(page: number): Promise<Task[]> {
    return this.items
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null,
    }

    this.items.push(task)

    return task
  }
}