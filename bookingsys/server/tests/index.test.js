import request from "supertest";
import server from "../../server";

describe('Accounts Endpoint', () => {
    test('Stuff', async () => {
      const res = await request(server).get('/api/accounts');
      expect(res.statusCode).toEqual(200);
    })
  })