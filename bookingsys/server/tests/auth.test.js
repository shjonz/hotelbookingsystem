import request from 'supertest';
import server from '../../server';


describe('Test Auth ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/auth');
        //console.log(response)
        expect(response.statusCode).toBe(200);
    });
});


describe('Test Auth register ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/auth/register');
        //console.log(response)
        expect(response.statusCode).toBe(200);
    });
});