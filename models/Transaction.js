const mongoose = require('mongoose'); 
const transactionSchema = new mongoose.Schema({ 
type: { 
type: String, 
enum: ['credit', 'debit'], 
required: true 
}, 
amount: { 
type: Number, 
required: true, 
min: [1, 'Amount must be greater than 0'] 
}, 
description: { 
type: String, 
trim: true 
}, 
user: { 
type: mongoose.Schema.Types.ObjectId, 
ref: 'User', 
required: true 
},
balanceAfter: { 
type: Number, 
required: true, 
}, 
createdAt: { 
type: Date, 
default: Date.now 
} 
});

module.exports = mongoose.model('Transaction', transactionSchema);