import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'

import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTaskUseCase } from './update-task.use-case'

let tasksRepository: InMemoryTasksRepository
let sut: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(tasksRepository)
  })

  it('Should be able to update task', async () => {
    const createTask = await tasksRepository.create({
      title: 'Task 01',
      description: 'This is a new task'
    })

    const { task } = await sut.execute({
      id: createTask.id,
      title: 'Task 10'
    })

    expect(task?.title).toBe('Task 10')
    expect(task?.description).toBe('This is a new task')
  })
})