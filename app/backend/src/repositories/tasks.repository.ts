import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  findById(id: string): Promise<Task | null>
  findMany(page: number): Promise<Task[]>
  create(data: Prisma.TaskCreateInput): Promise<Task>
}