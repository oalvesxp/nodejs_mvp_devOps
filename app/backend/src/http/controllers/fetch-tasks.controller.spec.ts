import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import console from 'console'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('[Integration] Fetch Tasks Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to fetch paginaded tasks', async () => {
    await prisma.task.createMany({
      data: [
        {
          title: 'task 01',
          description: 'Integration test'
        },
        {
          title: 'task 02',
          description: 'Integration test'
        }
      ]
    })

    const response = await request(app.server)
      .get('/tasks')
      .query({
        page: 1
      })

    expect(response.status).toBe(200)
    expect(response.body.tasks).toHaveLength(2)
  })
})