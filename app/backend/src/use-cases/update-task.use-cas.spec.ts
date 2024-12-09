import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { UpdateTaskUseCase } from './update-task.use-case'

import { beforeEach, describe, expect, it } from 'vitest'
import { TaskNotFoundError } from './errors/task-not-found.error'
import { MandatoryDataError } from './errors/mandatory-data.error'
import { randomUUID } from 'crypto'

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

  it('Should not be able to update task without mandatory data', async () => {
    const createTask = await tasksRepository.create({
      title: 'Task 01',
      description: 'This is a new task'
    })

    await expect(() =>
      sut.execute({
        id: createTask.id
      })
    ).rejects.toBeInstanceOf(MandatoryDataError)
  })

  it('Should not be able to update a non-existent task', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
        title: 'Task 10'
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})