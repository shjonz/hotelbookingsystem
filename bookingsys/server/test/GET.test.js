// server.test.js

import request from 'supertest';
import server from '../server';


// Test case for accountsRoute
describe('testing GET requests from accounts', () => {
  test('should return a list of accounts', async () => {
    // Make a GET request to /api/accounts
    const response = await request(server).get('/api/accounts');

    // Assuming the route returns an array of accounts in the response body
    expect(response.statusCode).toEqual(200);
    // You can add more specific expectations for the response if needed
    //expect(response.body).toEqual([...]); where [...] is the expected array of accounts
  });

  test('should return jon email from the db', async () => {
    const response = await request(server).get('/api/accounts/one?email=jon@gmail.com');
    expect(response.statusCode).toEqual(200);
  });    
});
