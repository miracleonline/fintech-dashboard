const Transaction = require('../models/Transaction'); 
exports.getDashboard = async (req, res) => { 
const userId = req.user._id; 
// Get total balance 
const transactions = await Transaction.find({ user: userId }); 
const balance = transactions.reduce((total, txn) => { 
return txn.type === 'credit' 
? total + txn.amount 
: total - txn.amount; 
}, 0); 
res.json({ 
username: req.user.username, 
role: req.user.role, 
balance, 
totalTransactions: transactions.length,
profileImage: req.user.profileImage 
}); 
}; 
exports.getTransactions = async (req, res) => { 
const userId = req.user._id; 
const transactions = await Transaction.find({ user: userId }).sort({ 
createdAt: -1 }); 
res.json(transactions); 
}; 

