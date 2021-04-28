const request = require('supertest')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request()
      .post('localhost:8080/usuario/create')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('post')
  })
})
