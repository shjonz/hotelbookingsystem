import request from 'supertest';
import server from '../../server';

// Returns name, uid and the _id of the destination based on searching
describe('Test the root path', () => { 
    test('It should respond with status 200 and return the _id, uid and name of the destination based on searching', async () => {
        const response = await request(server).get('/search?name=Rome');
        //console.log(response.body)
        expect(response.statusCode).toBe(200);
    });
});

// Returns uid based on id 
describe('Test the /dest/id path', () => { 
    test('It should respond with status 200 and return the uid of the destination based on id', async () => {
        const response = await request(server).get('/search/dest/id?id=64adfa1b041efa0a6bd6f9b9');
        //console.log(response.text) // RsBU
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("\"RsBU\"");
    });
});

// Returns uid based on destination name
describe('Test the /dest/name path', () => { 
    test('It should respond with status 200 and return the uid of the destination based on destination name', async () => {
        const response = await request(server).get('/search/dest/name?name=Singapore,+Singapore');
        //console.log(response.text) // RsBU
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("\"RsBU\"");
    });
});

