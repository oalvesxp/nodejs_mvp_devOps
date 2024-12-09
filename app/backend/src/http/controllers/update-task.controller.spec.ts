import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('[Integration] Update Task Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to update a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Task 01',
        description: 'This is a description'
      }
    })

    const response = await request(app.server).put(`/tasks/${task.id}`).send({
      title: 'Task 10',
      description: null
    })

    expect(response.status).toBe(204)
  })
})