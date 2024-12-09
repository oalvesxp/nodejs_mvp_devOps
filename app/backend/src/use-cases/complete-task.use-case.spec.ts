import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'

import { beforeEach, describe, expect, it } from 'vitest'
import { CompleteTaskUseCase } from './complete-task.use-case'

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
})