import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      trim: true, 
      required: true, 
      maxlength: 120 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      index: true 
    },
    password: { 
      type: String, 
      required: true, 
      minlength: 8, 
      select: false 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    balanceCents: { 
      type: Number, 
      default: 0 
    },
    countryCode: {
      type: String,
      default: '1',
      required: true,  
    },
    contactNumber: {
      type: String,
      trim: true,
      required: true,
    },
    accountType: {
      type: String,
      trim: true,
      required: true,
    },
    secondaryEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    referral: {
      type: String,
      trim: true,
    } 
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
