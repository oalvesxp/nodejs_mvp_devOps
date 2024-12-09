import { prisma } from '@/lib/prisma'
import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'

export class PrismaTasksRepository implements TasksRepository {
  async update(data: Prisma.TaskUpdateInput): Promise<Task | null> {
    const taskById = await prisma.task.findUnique({
      where: {
        id: data.id as string
      }
    })

    if (!taskById) {
      return null
    }

    const task = await prisma.task.update({
      where: {
        id: data.id as string
      },
      data: {
        title: data.title || taskById.title,
        description: data.description !== undefined
          ? data.description
          : taskById.description
      }
    })

    return task
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }

  async findMany(page: number): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      take: 20,
      skip: (page - 1) * 20
    })

    return tasks
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await prisma.task.create({ data })

    return task
  }

}