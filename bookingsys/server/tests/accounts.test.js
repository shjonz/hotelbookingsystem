import request from 'supertest';
import server from '../../server';


describe('Test getAllAccounts ', () => { // Get all users' existing account details 
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/accounts');
        /*console.log(response.body)  
        [
        {
          _id: '64b7b57c7ce93fc68ac620c3',
          name: 'ilovecutepeople',
          email: 'bob2@yahoo.com',
          password: '$2a$10$MqL.3C8I/Kt3n89XmDfsHOhz4C5iV1aJykPI2U.aB7ELwpjVbGD1W',
          bookingHistory: [
            '64b7c2f4e5ebb8f59401c8ff',
            '64b8fe58286659289d61f904',
            '64ba4446fb292664fa578117'
          ],
          __v: 0
        },
        and other accounts below 
        */
        expect(response.statusCode).toBe(200);
    });
});

describe('Test getAccount ', () => { // Get a specific user's account details based on email
    test('It should response the GET method', async () => { 
        const response = await request(server).get('/api/accounts/one?email=jon@gmail.com');
        /*console.log(response.body)      {
            _id: '64b7cea9dd171faed8280a5f',
            name: 'test',
            email: 'jon@gmail.com',
            password: '$2a$10$FiO7OXfgCGEakXIZEp4K/OPIEjv0nCeKJjuJRVu9OHDC0tem6dZSy',
            bookingHistory: [],
            __v: 0
          } */ 
        expect(response.statusCode).toBe(200);
    });
});


describe('Test no results for getAccount ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/accounts/one?email=jk@gmail.com');
        //console.log(response.body)
        expect(response.statusCode).toBe(404);
    });
});

// describe('Test createAccount ', () => { // Test creation of account
//     test('It should response the POST method', async () => {
//         const response = await request(server).post('/api/accounts/one').send({
//             email: 'jacky@gmail.com',
//             name: 'jacky',
//             password: 'jack',
//             bookingHistory: ["64b7c2f4e5ebb8f59401c8ff"]
//         });
//         //console.log(response)
//         expect(response.statusCode).toBe(201);
//     });
// });

// describe('Test deleteAccount ', () => { // Test deletion of account
//     test('It should response the delete method', async () => {
//         const response = await request(server).delete('/api/accounts/one?uid=64bbeb3d5ef31a863f77b669');
//         //console.log(response.body)
//         expect(response.statusCode).toBe(200);
//     });
// });