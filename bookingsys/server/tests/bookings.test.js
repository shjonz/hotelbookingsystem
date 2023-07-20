import request from 'supertest';
import server from '../../server';

// "user id": "64b7b57c7ce93fc68ac620c3",
// "booking": "64b7c2f4e5ebb8f59401c8ff"

describe('Test getBookingList ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/account/id?id=64b7c2f4e5ebb8f59401c8ff');
        console.log(response.body.bookingInfo)
        expect(response.statusCode).toBe(200);
    });
});

// describe('Test createBookingList ', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(server).get('/api/bookings/account/id?id=64b7c2f4e5ebb8f59401c8ff');
//         console.log(response.body.bookingInfo)
//         expect(response.statusCode).toBe(200);
//     });
// });
