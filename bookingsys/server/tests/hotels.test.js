import request from 'supertest';
import server from '../../server';


describe('Test hotelList ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default?destination_id=WD0M');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test hotelSearch ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default/diH7');
        console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});


describe('Test hotelListPrices ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test hotelSearchPrices ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/price?uid=diH7&destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});