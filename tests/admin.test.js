const request = require('supertest'); 
const app = require('../app'); 
const User = require('../models/User'); 
const Transaction = require('../models/Transaction'); 
const jwt = require('jsonwebtoken'); 
describe('Admin Override Transaction', () => { 
let adminToken, normalToken, transactionId; 
beforeEach(async () => { 
const admin = await User.create({ username: 'adminuser', password: 
'adminpass', role: 'admin' }); 
const user = await User.create({ username: 'normaluser', password: 
'userpass', role: 'user' }); 
adminToken = jwt.sign({ id: admin._id, role: admin.role }, 
process.env.JWT_SECRET); 
normalToken = jwt.sign({ id: user._id, role: user.role }, 
process.env.JWT_SECRET); 
const transaction = await Transaction.create({ user: user._id, type: 
'debit', amount: 50 }); 
transactionId = transaction._id; 
}); 
it('should allow admin to override a transaction', async () => { 
const res = await request(app) 
.put(`/api/admin/transactions/${transactionId}`) 
.set('Authorization', `Bearer ${adminToken}`) 
.send({ amount: 999, type: 'credit' }); 
expect(res.statusCode).toBe(200); 
expect(res.body.transaction.amount).toBe(999); 
expect(res.body.transaction.type).toBe('credit'); 
}); 
it('should prevent non-admin from overriding a transaction', async () => { 
const res = await request(app) 
.put(`/api/admin/transactions/${transactionId}`) 
.set('Authorization', `Bearer ${normalToken}`) 
.send({ amount: 999 }); 
expect(res.statusCode).toBe(403); 
expect(res.body.message).toBe('Forbidden: Insufficient role permissions'); 
}); 
}); 