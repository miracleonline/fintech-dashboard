import catchAsync from '../utils/catchAsync.js';
import { fromCents } from '../utils/money.js';

export const getBalance = catchAsync(async (req, res) => {
  res.json({ success: true, balance: fromCents(req.user.balanceCents) });
});
