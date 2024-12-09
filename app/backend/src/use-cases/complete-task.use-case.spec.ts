import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { CompleteTaskUseCase } from './complete-task.use-case'

import { beforeEach, describe, expect, it } from 'vitest'
import { TaskNotFoundError } from './errors/task-not-found.error'
import { randomUUID } from 'crypto'

let tasksRepository: InMemoryTasksRepository
let sut: CompleteTaskUseCase

describe('Complete Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CompleteTaskUseCase(tasksRepository)
  })

  it('Should be able to complete task', async () => {
    const createTask = await tasksRepository.create({
      title: 'Task 01',
      description: 'This is a new task'
    })

    const { task: taskCompleted } = await sut.execute({
      id: createTask.id,
    })

    const { task: taskUncompleted } = await sut.execute({
      id: createTask.id,
    })

    expect(taskCompleted?.completed_at).toEqual(expect.any(Date))
    expect(taskUncompleted?.completed_at).toEqual(null)
  })

  it('Should not be able to complete a non-existent task', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})