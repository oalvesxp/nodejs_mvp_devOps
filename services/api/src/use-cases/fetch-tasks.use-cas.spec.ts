import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'

import { beforeEach, describe, expect, it } from 'vitest'
import { FetchTasksUseCase } from './fetch-tasks.use-case'

let tasksRepository: InMemoryTasksRepository
let sut: FetchTasksUseCase

describe('Fetch Tasks Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FetchTasksUseCase(tasksRepository)
  })

  it('Should be able to fetch pagined tasks', async () => {
    for (let i = 1; i <= 22; i++) {
      await tasksRepository.create({
        title: `Task ${i}`,
        description: 'Unit test'
      })
    }

    const { tasks } = await sut.execute({
      page: 2
    })

    expect(tasks).toHaveLength(2)
    expect(tasks).toEqual([
      expect.objectContaining({ title: 'Task 21' }),
      expect.objectContaining({ title: 'Task 22' })
    ])
  })
})