import request from 'supertest';
import server from '../../server';

// Get all users' existing account details 
describe('Test getAllAccounts ', () => { 
    test('It should respond with status 200 and return all accounts', async () => {
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
        expect(response.body.length).toBeGreaterThan(1);
        expect(response.statusCode).toBe(200);
    });
});

// Get a specific user's account details based on email
describe('Test getAccount ', () => { 
    test('It should respond with status 200 and return account details for valid email', async () => { 
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
        expect(response.body._id).toBe('64b7cea9dd171faed8280a5f');
    });

    test('It should respond with status 404 and not return account details for invalid email', async () => {
        const response = await request(server).get('/api/accounts/one?email=jk@gmail.com');
        expect(response.statusCode).toBe(404);
        expect(response.body.length).toBe(undefined);
    });
});

// Delete account
describe('Test deleteAccount ', () => { 
        // test('It should respond with status 200 and delete an account for a valid uid', async () => {
        //     const response = await request(server).delete('/api/accounts/one?uid=64d0f63ef7f56a9e13d74693');
        //     expect(response.statusCode).toBe(200);
        // });
    
        test('It should respond with status 404 and not delete an account for an invalid uid', async () => {
            const response = await request(server).delete('/api/accounts/one?uid=hihi');
            expect(response.statusCode).toBe(404);
        });
    });

// Create account
describe('Test createAccount ', () => { 
    // test('It should respond with status 201 and create an account for a valid body', async () => {
    //     const response = await request(server).post('/api/accounts/one').send({
    //         email: 'jacky@gmail.com',
    //         name: 'jacky',
    //         password: 'jack',
    //         bookingHistory: ["64b7c2f4e5ebb8f59401c8ff"]
    //     });
    //     expect(response.statusCode).toBe(201);
    // });

    test('It should respond with status 409 and not create an account for a already registered email', async () => {
        const response = await request(server).post('/api/accounts/one').send({
            email: 'jon2@gmail.com',
            name: 'jacky',
            password: 'jack',
            bookingHistory: ["64b7c2f4e5ebb8f59401c8ff"]
        });
        expect(response.statusCode).toBe(409);
    });
});

// Update account
describe('Test updateAccount ', () => { 
    // test('It should respond with status 200 and update an account for a valid body', async () => {
    //     const response = await request(server).patch('/api/accounts/one').send({
    //         email: 'jon2@gmail.com',
    //         name: 'jacky',
    //         password: 'jack',
    //         bookingHistory: ["64b7c2f4e5ebb8f59401c8ff", "64b8fe58286659289d61f904", "64c3194623cd9158fe1ea149"]
    //     });
    //     expect(response.statusCode).toBe(200);
    // });

    test('It should respond with status 409 and not update an account for an invalid registered email', async () => {
        const response = await request(server).patch('/api/accounts/one').send({
            email: 'blehhh@gmail.com',
            name: 'jacky',
            password: 'jack',
            bookingHistory: ["64b7c2f4e5ebb8f59401c8ff"]
        });
        expect(response.statusCode).toBe(409);
    });
});

// Update Booking list of account
describe('Test updateBookingList ', () => { 
    // test('It should respond with status 200 and update a booking list for a valid body', async () => {
    //     const response = await request(server).patch('/api/accounts/').send({
    //         email: 'jon2@gmail.com',
    //         bookingHistory: ["24ae34"]
    //     });
    //     expect(response.statusCode).toBe(200);
    // });

    test('It should respond with status 404 and not update a booking list for an invalid registered email', async () => {
        const response = await request(server).patch('/api/accounts/').send({
            email: 'blehhh@gmail.com',
            bookingHistory: ["64b7c2f4e5ebb8f59401c8ff"]
        });
        expect(response.statusCode).toBe(404);
    });
});



// Delete a booking entry
describe('Test deleteBookingEntry ', () => { 
    // test('It should respond with status 200 and delete a booking entry for a valid email and valid booking entry', async () => {
    //     const response = await request(server).patch('/api/accounts/del').send({
    //         email: 'jon2@gmail.com',
    //         bookingHistory: "24ae34"
    //     });
    //     expect(response.statusCode).toBe(200);
    // });

    test('It should respond with status 404 and not delete a booking entry for an invalid registered email', async () => {
        const response = await request(server).patch('/api/accounts/del').send({
            email: 'blehhh@gmail.com',
            bookingHistory: "64b7c2f4e5ebb8f59401c8ff"
        });
        expect(response.statusCode).toBe(404);
    });
});





// Integration test
describe('Create account, updates account, delete account', () => {
    let responseCreate;
    let uid;
    
    beforeEach(async () => {
        // Create Account (before)
        const payload = {name: "King Francois the Seconded", email: "to_be_the_king@royalty.mail.sg", password: "I am the greatest king in history", bookingHistory: []}
        responseCreate = await request(server).post('/api/accounts/one').send(payload)
        expect(responseCreate.statusCode).toBe(201)
        uid = responseCreate.body._id
      });
      
      afterEach(async () => {
        // Delete Account (after)
        const responseDelete = await request(server).delete(`/api/accounts/one?uid=${uid}`)
        expect(responseDelete.statusCode).toBe(200)
      });

    test('Full test', async () => {
        // Update Account
        const updateName = {email:"to_be_the_king@royalty.mail.sg", name: "King Baby the Third"}
        const responseName = await request(server).patch('/api/accounts/one').send(updateName)
        expect(responseName.statusCode).toBe(200)

        // Get New Account Details
        const responseGet = await request(server).get('/api/accounts/one?email=to_be_the_king@royalty.mail.sg')
        expect(responseGet.body.name).toBe("King Baby the Third")
    });
});


