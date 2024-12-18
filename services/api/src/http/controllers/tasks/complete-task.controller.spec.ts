import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'


describe('[Integration] Complete Task Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to complete a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Task 01',
        description: null
      }
    })

    const response = await request(app.server).patch(`/tasks/${task.id}/complete`).send()

    expect(response.status).toBe(200)
    expect(response.body.task).toEqual(
      expect.objectContaining({
        completed_at: expect.any(String)
      })
    )
  })
})