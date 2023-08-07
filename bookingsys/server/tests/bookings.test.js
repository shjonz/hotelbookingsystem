import request from 'supertest';
import server from '../../server';

describe('Test getBooking ', () => { // Get booking info based on booking uid
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/one?uid=64b8fe58286659289d61f904');
        console.log(response.body) // get booking   64b8fe58286659289d61f904
        expect(response.statusCode).toBe(200);
    });
});


describe('Test failure of getBooking ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/bookings/one?uid=hihi');
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

describe('Test createBooking ', () => { // Get booking info of user using user id
    test('It should response the POST method', async () => {
        const body = {
            destID : "",
            hotelID : "",
            price : "",
            bookingInfo : ""
        }
            const response = await request(server).post('/api/bookings/one').send(body);
            console.log(response.body) // 
            expect(response.statusCode).toBe(200);
})});

// Integration test
describe('Test createBooking, getBooking and deleteBooking ', () => { // Create booking 
    beforeEach(async () => {
        // Create Booking
        const payload = {
        destID : "",
        hotelID : "",
        price : "",
        bookingInfo : ""
    }
        const responseCreate = await request(server).post('/api/bookings/one').send(payload);
        console.log(responseCreate.body) // 
        expect(responseCreate.statusCode).toBe(201);
        const uid = responseCreate.body._id
    });

    afterEach(async () =>{
        // Delete Booking
        const responseDelete= await request(server).delete('/api/bookings/one?uid=${uid}')
        expect(responseDelete.statusCode).toBe(200);

        // Should not Get booking
        const responseGet = await request(server).get('/api/bookings/one?uid=${uid}')
        console.log(responseGet.body)
        expect(responseGet.statusCode).toBe(200);
    });

    test('Update and read booking', async () => {
        // Update booking
        const updateBooking = {
            destID : "",
            hotelID : "",
            price : "",
            bookingInfo : ""
        }
        const responsePut = await request(server).put('/api/bookings/one?uid=${uid}').send(updateBooking)
        console.log(responsePut.body)
        expect(responsePut.statusCode).toBe(200);

        // Should Get booking
        const responseGet = await request(server).get('/api/bookings/one?uid=${uid}')
        console.log(responseGet.body)
        expect(responseGet.statusCode).toBe(200);
    });

});


// describe('Test createBookingList ', () => {
//     test('It should response the GET method', async () => {
//         const response = await request(server).get('/api/bookings/account/id?id=64b7c2f4e5ebb8f59401c8ff');
//         console.log(response.body.bookingInfo)
//         expect(response.statusCode).toBe(200);
//     });
// });
