import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.js';
import { fromCents } from '../utils/money.js';

// Get balance 
export const getBalance = catchAsync(async (req, res) => {
  res.json({ success: true, balance: fromCents(req.user.balanceCents) });
});

// Get account info
export const getAccountInfo = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "wallet_address bank_name account_number address city country zip_code profileImage"
  );
  res.json({ success: true, account: user });
});

// Update account info
export const updateAccountInfo = catchAsync(async (req, res) => {
  const { wallet_address, bank_name, account_number, address, city, country, zip_code } = req.body;

  let updateData = { wallet_address, bank_name, account_number, address, city, country, zip_code };

  if (req.file) {
    updateData.profileImage = `/uploads/${req.file.filename}`; 
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true, runValidators: true }
  ).select("wallet_address bank_name account_number address city country zip_code profileImage");

  res.json({ success: true, account: user });
});
