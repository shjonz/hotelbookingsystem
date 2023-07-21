import request from 'supertest';
import server from '../server';

describe('testing POST requests from accounts', () => {
    test('should make a POST request', async () => {
      const response = await request(server).post('/api/accounts/one');
      expect(response.statusCode).toEqual(200);
  });
});
  