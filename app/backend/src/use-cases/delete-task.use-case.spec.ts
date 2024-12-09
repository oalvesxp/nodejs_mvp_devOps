import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'

import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTaskUseCase } from './delete-task.use-case'

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
})