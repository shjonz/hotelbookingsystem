import request from 'supertest';
import server from '../../server';


describe('Test getAllAccounts ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/accounts');
        console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test getAccount ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/accounts/one?email=jon@gmail.com');
        console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

// describe('Test createAccount ', () => {
//     test('It should response the POST method', async () => {
//         const response = await request(server).post('/api/accounts/one?email=jacky@gmail.com');
//         console.log(response.body)
//         expect(response.statusCode).toBe(200);
//     });
// });
