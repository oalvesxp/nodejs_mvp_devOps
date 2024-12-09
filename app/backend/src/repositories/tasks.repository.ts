import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  complete(id: string): Promise<Task | null>
  update(data: Prisma.TaskUpdateInput): Promise<Task | null>
  findById(id: string): Promise<Task | null>
  findMany(page: number): Promise<Task[]>
  create(data: Prisma.TaskCreateInput): Promise<Task>
}