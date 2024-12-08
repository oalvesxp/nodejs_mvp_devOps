import { prisma } from '@/lib/prisma'
import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'

export class PrismaTasksRepository implements TasksRepository {
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