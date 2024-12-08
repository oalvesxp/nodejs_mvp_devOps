import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('[Integration] Get Task Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Task 01',
        description: null
      }
    })

    const response = await request(app.server).get(`/tasks/${task.id}`).send({
      title: 'Task 01',
      description: 'this is a new task'
    })

    expect(response.status).toBe(200)
    expect(response.body.task).toEqual(
      expect.objectContaining({
        id: expect.any(String)
      })
    )
  })
})