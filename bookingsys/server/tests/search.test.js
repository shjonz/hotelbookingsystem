import request from 'supertest';
import server from '../../server';


describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the /dest/id path', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search/dest/id?id=64adfa1b041efa0a6bd6f9b9');
        console.log(response.body.uid)
        console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the /dest/name path', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search/dest/name?name=Singapore,+Singapore');
        console.log(response.body.uid)
        console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
    });
});
