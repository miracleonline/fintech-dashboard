const request = require('supertest'); 
const app = require('../app'); 
const User = require('../models/User'); 
describe('Auth Routes', () => { 
beforeEach(async () => { 
await User.create({ username: 'testuser', password: '123456' }); 
}); 
it('should login a user', async () => { 
const res = await request(app) 
.post('/api/auth/login') 
.send({ username: 'testuser', password: '123456' }); 
expect(res.statusCode).toBe(200); 
expect(res.body).toHaveProperty('token'); 
expect(res.body.username).toBe('testuser'); 
}); 
it('should fail login with wrong credentials', async () => { 
const res = await request(app) 
.post('/api/auth/login') 
.send({ username: 'testuser', password: 'wrongpass' }); 
expect(res.statusCode).toBe(401); 
expect(res.body.message).toBe('Invalid credentials'); 
}); 
});