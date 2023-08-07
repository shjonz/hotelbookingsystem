import request from 'supertest';
import server from '../../server';

// Get all bookings
describe('Test getAllBookings ', () => { 
    test('It should respond with status 200 and return all bookings', async () => {
        const response = await request(server).get('/api/bookings/');
        expect(response.body.length).toBeGreaterThan(1);
        expect(response.statusCode).toBe(200);
    });
});

// Get booking info based on booking uid
describe('Test getBooking ', () => { 
    test('It should respond with status 200 and return details of a booking for valid uid', async () => {
        const response = await request(server).get('/api/bookings/one?uid=64cbab503d654c6aa17d69ae');
        //console.log(response.body) // get booking   64b8fe58286659289d61f904
        expect(response.statusCode).toBe(200);
        expect(response.body._id.length).toBeGreaterThan(1);
        expect(response.body.destID).toBe("CB4E");
    });

    test('It should respond with status 404 and return an empty body for invalid uid', async () => {
        const response = await request(server).get('/api/bookings/one?uid=hihi');
        expect(response.statusCode).toBe(404);
        expect(response.body.length).toBe(undefined);
    });
});

// Update booking 
describe('Test updateBooking ', () => { 
    //     test('It should respond with status 200 and update booking for a valid uid ', async () => {
    //         const body = {
    //             destID : "CB4E",
    //             hotelID : "kky2",
    //             price : "123",
    //             bookingInfo : {"firstName": "b"}
    //         }
    //             const response = await request(server).put('/api/bookings/one?uid=64d119187fc67424457b09b8').send(body);
    //             console.log(response.body) 
    //             expect(response.statusCode).toBe(200);
    // });
    
    test('It should respond with status 404 for an invalid uid', async () => {
        const body = {
            destID : "WD0M",
            hotelID : "h3z1",
            price : "123",
            bookingInfo : {"firstName": "b"}
        }
            const response = await request(server).put('/api/bookings/one?uid=hihi').send(body);
            expect(response.statusCode).toBe(404);
    })});


// Get booking info of user using user id
describe('Test getBookingList ', () => { 
    test('It should respond with status 200 and return an array of bookings for valid email', async () => {
        const response = await request(server).get('/api/bookings/id?email=cord@slay.com');
        // [ '64b7c2f4e5ebb8f59401c8ff', '64ba4446fb292664fa578117' ]
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBe('64b7c2f4e5ebb8f59401c8ff')
    });

    test('It should respond with status 404 and return an empty body for invalid email ', async () => {
        const response = await request(server).get('/api/bookings/id?email=hihi@hihi.com');
        expect(response.statusCode).toBe(404);
        expect(response.body.length).toBe(undefined);
    });
});

// Delete booking 
describe('Test deleteBooking ', () => { 
    //     test('It should response the DELETE method', async () => {
    //         const response = await request(server).delete('/api/bookings/one?uid=64d0fafbc2b058c1b9775534');
    //         //console.log(response.body)
    //         expect(response.statusCode).toBe(200);
    // });
    
        test('It should respond with status 404 for an invalid uid', async () => {
            const response = await request(server).delete('/api/bookings/one?uid=h1h1');
            expect(response.statusCode).toBe(404);
    })});    

// Create booking 
describe('Test createBooking ', () => { 
    // test('It should respond with status 200 and create a booking for a valid body', async () => {
    //     const body = {
    //         destID : "WD0M",
    //         hotelID : "h3z1",
    //         price : "123",
    //         bookingInfo : {"firstName": "b"}
    //     }
    //         const response = await request(server).post('/api/bookings/create').send(body);
    //         console.log(response.body) // 
    //         expect(response.statusCode).toBe(200);
    // });

    test('It should respond with status 400 and not create a booking for an invalid body', async () => {
        const body = {
            destID : "",
            hotelID : "",
            price : "",
            bookingInfo : ""
        }
            const response = await request(server).post('/api/bookings/create').send(body);
            expect(response.statusCode).toBe(400);
})});





// Integration test
describe('CreateBooking, updateBooking and deleteBooking ', () => { // Create booking 
    let uid;

    beforeEach(async () => {
        // Create Booking
        const payload = {
        destID : "WD0M",
        hotelID : "h3z1",
        price : "123",
        bookingInfo : "{}"
    }
        const responseCreate = await request(server).post('/api/bookings/create').send(payload);
        expect(responseCreate.statusCode).toBe(200);
        uid = responseCreate.body._id;
    });

    afterEach(async () =>{
        // Delete Booking
        const responseDelete= await request(server).delete(`/api/bookings/one?uid=${uid}`)
        expect(responseDelete.statusCode).toBe(200);

        // Should not Get booking
        const responseGet = await request(server).get(`/api/bookings/one?uid=${uid}`)
        expect(responseGet.statusCode).toBe(200);
        expect(responseGet.body.length).toBe(undefined);
    });

    test('Update and read booking', async () => {
        // Update booking
        const updateBooking = {
            destID : "WD0M",
            hotelID : "WaXd",
            price : "234",
            bookingInfo : "{}"
        }
        const responsePut = await request(server).put(`/api/bookings/one?uid=${uid}`).send(updateBooking)
        expect(responsePut.statusCode).toBe(200);

        // Should Get booking
        const responseGet = await request(server).get(`/api/bookings/one?uid=${uid}`)
        expect(responseGet.body.hotelID).toBe("WaXd");
    });

});


