import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'

import { randomUUID } from 'crypto'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async complete(id: string, completed_at: Date | null): Promise<Task | null> {
    const taskIndex = this.items.findIndex((item) => item.id === id)

    if (taskIndex < 0) {
      return null
    }

    const task = this.items[taskIndex] = {
      ...this.items[taskIndex],
      completed_at
    }

    return task
  }

  async update(data: Prisma.TaskUpdateInput): Promise<Task | null> {
    const taskIndex = this.items.findIndex((item) => item.id === data.id)

    if (taskIndex < 0) {
      return null
    }

    const task = this.items[taskIndex] = {
      ...this.items[taskIndex],
      title: data.title !== undefined
        ? (data.title as string)
        : this.items[taskIndex].title,
      description: data.description !== undefined
        ? (data.description as string | null)
        : this.items[taskIndex].description,
    }

    return task
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id)
    if (!task) return null

    return task
  }

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