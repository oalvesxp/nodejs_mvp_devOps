import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  findMany(page: number): Promise<Task[]>
  create(data: Prisma.TaskCreateInput): Promise<Task>
}