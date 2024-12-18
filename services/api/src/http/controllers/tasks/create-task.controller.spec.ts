import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('[Integration] Create Task Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a task', async () => {
    const response = await request(app.server).post('/tasks').send({
      title: 'Task 01',
      description: 'this is a new task'
    })

    expect(response.status).toBe(201)
  })

})