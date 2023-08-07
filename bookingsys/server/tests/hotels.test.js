import request from 'supertest';
import server from '../../server';


describe('Test hotelList ', () => { // Searches for a list of hotels based on the UID of the destination.
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default?destination_id=WD0M');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test no results for hotelList ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default?destination_id=hihi');
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });
});

describe('Test hotelSearch ', () => { // Searches for a specific hotel based on its UID.
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default/diH7');
        //console.log(response.body) 
        /* {
        id: 'diH7',
        imageCount: 56,
        latitude: 1.28624,
        longitude: 103.852889,
        name: 'The Fullerton Hotel Singapore',
        address: '1 Fullerton Square',
        address1: '1 Fullerton Square',
        and other info
        */
        expect(response.statusCode).toBe(200);
    });
});


describe('Test no results for hotelSearch i.e. invalid id ', () => {
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/default/hihi');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(undefined);
    });
});


describe('Test hotelListPrices ', () => { // Searches for a list of hotels' prices and info based on UID of destination
    test('It should response the GET method', async () => {
        const response = await request(server).get('/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

// Bakacomment: This doesn't work cos of timeout, something to do with changes to Ascenda API kicking you now
describe('Test no results of hotelListPrices i.e. invalid id  ', () => {
    test('It should response the GET method', async () => { //destination_id=hihi
        const response = await request(server).get('/api/hotels/prices?destination_id=hihi&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test hotelSearchPrices ', () => { // Only retrieves list of hotels with prices, no info included.
    test('It should response the GET method', async () => { 
        const response = await request(server).get('/api/hotels/price?uid=diH7&destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test failure of hotelSearchPrices i.e. invalid id', () => {
    test('It should response the GET method', async () => { //destination_id=hihi
        const response = await request(server).get('/api/hotels/price?uid=diH7&destination_id=hihi&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1');
        //console.log(response.statusCode)
        expect(response.body.length).toBe(undefined);
        expect(response.statusCode).toBe(200);
    });
});