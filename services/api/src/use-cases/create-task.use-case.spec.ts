import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { CreateTaskUseCase } from './create-task.use-case'

import { beforeEach, describe, expect, it } from 'vitest'

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('Should be able to create a new task', async () => {
    const { task } = await sut.execute({
      title: 'Criar uma API node.js',
      description: null
    })

    expect(task.id).toEqual(expect.any(String))
  })
})