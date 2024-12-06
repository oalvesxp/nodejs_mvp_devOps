import { prisma } from '@/lib/prisma'
import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'

export class PrismaTasksRepository implements TasksRepository {

  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task = await prisma.task.create({ data })

    return task
  }

}