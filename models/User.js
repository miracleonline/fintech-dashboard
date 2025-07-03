// models/User.js 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 
// Schema 
const userSchema = new mongoose.Schema({ 
username: { 
type: String, 
required: [true, 'Username required'], 
unique: true 
}, 
password: { 
type: String, 
required: [true, 'Password required'] 
}, 
role: { 
type: String, 
enum: ['user', 'admin'], 
default: 'user' 
} 
}); 
// Password Hashing Before Save 
userSchema.pre('save', async function (next) { 
if (!this.isModified('password')) return next(); // If password hasn't changed 
const salt = await bcrypt.genSalt(10); 
this.password = await bcrypt.hash(this.password, salt); 
next(); 
}); 
// Compare Password 
userSchema.methods.matchPassword = async function (enteredPassword) { 
return await bcrypt.compare(enteredPassword, this.password); 
}; 
module.exports = mongoose.model('User', userSchema);