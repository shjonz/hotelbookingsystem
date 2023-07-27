import request from 'supertest';
import server from '../../server';

describe('Test getBooking ', () => { // Get booking info based on booking uid
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/?uid=64b8fe58286659289d61f904');
        //console.log(response.body) // get booking   64b8fe58286659289d61f904
        expect(response.statusCode).toBe(200);
    });
});


describe('Test failure of getBooking ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/?uid=hihi');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(undefined);
    });
});

describe('Test getBookingList ', () => { // Get booking info of user using user id
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/id?uid=64b7b57c7ce93fc68ac620c3');
        //console.log(response.body) 
        /* {
            _id: '64b8fe58286659289d61f904',
            destID: 'hotel2',
            hotelID: 'ahf',
            bookingInfo: { '2': 'bookingobj2', name: 'bookingobj1' },
            price: 50
          }  */
        expect(response.statusCode).toBe(200);
    });
});

describe('Test failure of getBookingList ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/id?uid=00a');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(undefined);
    });
});











// describe('Test createBookingList ', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(server).get('/api/bookings/account/id?id=64b7c2f4e5ebb8f59401c8ff');
//         console.log(response.body.bookingInfo)
//         expect(response.statusCode).toBe(200);
//     });
// });
