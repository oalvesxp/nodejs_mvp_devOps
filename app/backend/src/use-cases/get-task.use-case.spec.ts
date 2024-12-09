import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { GetTaskUseCase } from './get-task.use-case'

import { beforeEach, describe, expect, it } from 'vitest'
import { TaskNotFoundError } from './errors/task-not-found.error'
import { randomUUID } from 'crypto'

let tasksRepository: InMemoryTasksRepository
let sut: GetTaskUseCase

describe('Get Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetTaskUseCase(tasksRepository)
  })

  it('Should be able to get task', async () => {
    const createTaskResponse = await tasksRepository.create({
      title: 'Criar uma API node.js',
      description: null
    })

    const { task } = await sut.execute({ id: createTaskResponse.id })

    expect(task.id).toEqual(expect.any(String))
  })

  it('Should not be able to get a non-existent task', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID()
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})