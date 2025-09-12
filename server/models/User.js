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
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: 'No address updated'
    },
    accountType: {
      type: String,
      trim: true,
    },
    secondaryEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    referral: {
      type: String,
      trim: true,
    },
    status : {
      type: String,
      trim: true,
      enum: ['Active', 'Inactive', 'Suspended'], 
      default: 'Active'
    },
    wallet_address: { 
      type: String, 
      default: "" 
    },
    bank_name: { 
      type: String, 
      default: "" 
    },
    account_number: { 
      type: String, 
      default: "" 
    },
    city: { 
      type: String, 
      default: "" 
    },
    country: { 
      type: String, 
      default: "" 
    },
    zip_code: { 
      type: String, 
      trim: true, 
      default: "" 
    },
    profileImage: { 
      type: String, 
      default: "" 
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
