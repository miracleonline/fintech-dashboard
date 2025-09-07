import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';

const signToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

export const register = catchAsync(async (req, res) => {
  const { name, email, password, countryCode, contactNumber, accountType, secondaryEmail, referral } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, 'Email already in use');

  const user = await User.create({ name, email, password, countryCode, contactNumber, accountType, secondaryEmail, referral });
  const token = signToken(user);
  res.status(201).json({
    success: true,
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      balance: user.balanceCents / 100,
      countryCode: user.countryCode,
      contactNumber: user.contactNumber,
      accountType: user.accountType,
      secondaryEmail: user.secondaryEmail || "",
      referral: user.referral || ""
    }
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const ok = await user.comparePassword(password);
  if (!ok) throw new ApiError(401, 'Invalid credentials');

  const token = signToken(user);
  res.json({
    success: true,
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      balance: user.balanceCents / 100 
    }
  });
});

export const me = catchAsync(async (req, res) => {
  res.json({ success: true, user: req.user });
});
