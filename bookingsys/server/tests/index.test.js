import request from "supertest"
import app from "../../server"

describe('Accounts Endpoint', () => {
    test('Stuff', async () => {
      const res = await request(app).get('/api/accounts')
      expect(res.statusCode).toEqual(200)
    })
  })