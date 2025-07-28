const Transaction = require('../models/Transaction'); 
const User = require('../models/User'); 
// POST /api/transactions 
exports.makeTransaction = async (req, res, next) => { 
try { 
const { type, amount } = req.body; 
const user = req.user; 
// Validate input 
if (!type || !['credit', 'debit'].includes(type)) { 
return res.status(400).json({ message: 'Invalid transaction type' }); 
} 
if (typeof amount !== 'number' || amount <= 0) { 
return res.status(400).json({ message: 'Amount must be a positive number' }); 
} 
// Fetch user data 
const dbUser = await User.findById(user._id); 
// Determine new balance 
let newBalance; 
if (type === 'debit') { 
if (amount > dbUser.balance) { 
return res.status(400).json({ message: 'Insufficient balance' }); 
} 
newBalance = dbUser.balance - amount; 
} else { 
newBalance = dbUser.balance + amount; 
} 
// Update user balance 
dbUser.balance = newBalance; 
await dbUser.save(); 
// Log transaction 
const transaction = await Transaction.create({ 
user: dbUser._id, 
type, 
amount, 
balanceAfter: newBalance, 
}); 
res.status(201).json({ 
message: 'Transaction successful', 
transaction, 
}); 
} catch (err) { 
next(err); // Pass to custom error handler 
} 
}; 