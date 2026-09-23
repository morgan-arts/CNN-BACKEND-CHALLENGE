const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // Make sure module.exports = app is at the end of server.js

describe('Auth & News API Endpoints', () => {
let token;

// Test User Registration
it('should register a new user', async () => {
const res = await request(app)
.post('/api/auth/register')
.send({
firstname: 'Test',
lastname: 'User',
email: `test${Date.now()}@example.com`,
password: 'password123'
});

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('message');
});

// Test Reject Registration with Missing Fields
it('should return 400 if required fields are missing', async () => {
const res = await request(app)
.post('/api/auth/register')
.send({
firstname: 'Test'
});

expect(res.statusCode).toEqual(400);
expect(res.body.message).toEqual('All fields are required');
});
});
