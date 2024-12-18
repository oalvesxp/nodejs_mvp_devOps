import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'


describe('[Integration] Delete Task Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to delete a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Task 01',
        description: null
      }
    })

    const response = await request(app.server).delete(`/tasks/${task.id}`).send({
      title: 'Task 01',
      description: 'this is a new task'
    })

    expect(response.status).toBe(204)
  })
})