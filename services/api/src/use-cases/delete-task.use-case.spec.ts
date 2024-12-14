import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { DeleteTaskUseCase } from './delete-task.use-case'

import { beforeEach, describe, expect, it } from 'vitest'
import { TaskNotFoundError } from './errors/task-not-found.error'
import { randomUUID } from 'crypto'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Detelete Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('Should be able to delete task', async () => {
    const createTask = await tasksRepository.create({
      title: 'Task 01',
      description: 'This is a new task'
    })

    const { deleted } = await sut.execute({
      id: createTask.id,
    })

    expect(deleted).toEqual(true)
  })

  it('Should not be able to delete a non-existent task', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})