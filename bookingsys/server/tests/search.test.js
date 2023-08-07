import request from 'supertest';
import server from '../../server';


describe('Test the root path', () => { // returns name, uid and the _id of the destinatio
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search?name=Rome');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the /dest/id path', () => { // returns uid based on id 
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search/dest/id?id=64adfa1b041efa0a6bd6f9b9');
        console.log(response.text) // RsBU
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test /dest/id path for no search results', () => {
    test('It should response the GET method, uid is undefined but status code is 200', async () => {
        const response = await request(server).get('/search/dest/id?id=hihi');
        //console.log(response.text) 
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
        expect(response.uid).toBe(undefined);
    });
});

describe('Test the /dest/name path', () => { // returns uid based on destination name
    test('It should response the GET method', async () => {
        const response = await request(server).get('/search/dest/name?name=Singapore,+Singapore');
        //console.log(response.text) // RsBU
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(200);
    });
});

describe('Test no results for /dest/name path', () => {
    test('It should response the GET method and return ', async () => {
        const response = await request(server).get('/search/dest/name?name=Sentosa');
        //console.log(response.text) 
        //console.log(response.statusCode)
        expect(response.statusCode).toBe(500);
    });
});

