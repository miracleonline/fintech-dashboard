import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { getPagination } from '../utils/paginate.js';
import { toCents, fromCents } from '../utils/money.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { config } from '../config/index.js';

const deltaFor = (type, amountCents) => (type === 'credit' ? amountCents : -amountCents);

export const createTransaction = catchAsync(async (req, res) => {
  const { type, amount, description, occurredAt } = req.body;
  const amountCents = toCents(amount);
  if (amountCents < 1) throw new ApiError(422, 'Amount must be >= 0.01');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.user._id).session(session).exec();
    if (!user) throw new ApiError(404, 'User not found');

    const delta = deltaFor(type, amountCents);
    const newBalance = user.balanceCents + delta;

    if (!config.allowNegativeBalance && newBalance < 0) {
      throw new ApiError(400, 'Insufficient funds');
    }

    user.balanceCents = newBalance;
    await user.save({ session });

    const tx = await Transaction.create([{
      user: user._id,
      type,
      amountCents,
      description,
      occurredAt: occurredAt ? new Date(occurredAt) : undefined
    }], { session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      transaction: {
        id: tx[0]._id,
        type: tx[0].type,
        amount: fromCents(tx[0].amountCents),
        description: tx[0].description,
        occurredAt: tx[0].occurredAt
      },
      balance: fromCents(user.balanceCents)
    });
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

export const listTransactions = catchAsync(async (req, res) => {
  const { type, start, end } = req.query || {};
  const { page, limit, skip } = getPagination(req.query, 10, 100);

  const filter = { user: req.user._id };
  if (type && ['credit', 'debit'].includes(type)) filter.type = type;
  if (start || end) {
    filter.occurredAt = {};
    if (start) filter.occurredAt.$gte = new Date(start);
    if (end) filter.occurredAt.$lte = new Date(end);
  }

  const [items, total] = await Promise.all([
    Transaction.find(filter).sort({ occurredAt: -1, _id: -1 }).skip(skip).limit(limit),
    Transaction.countDocuments(filter)
  ]);

  res.json({
    success: true,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    },
    transactions: items.map((t) => ({
      id: t._id,
      type: t.type,
      amount: fromCents(t.amountCents),
      description: t.description,
      occurredAt: t.occurredAt
    }))
  });
});

export const updateTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, amount, description, occurredAt } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const tx = await Transaction.findOne({ _id: id, user: req.user._id }).session(session);
    if (!tx) throw new ApiError(404, 'Transaction not found');

    const user = await User.findById(req.user._id).session(session);
    if (!user) throw new ApiError(404, 'User not found');

    // Reverse old effect
    const reverseDelta = -deltaFor(tx.type, tx.amountCents);
    // New effect
    const newAmountCents = amount !== undefined ? toCents(amount) : tx.amountCents;
    const newType = type || tx.type;
    const newDelta = deltaFor(newType, newAmountCents);

    const tentativeBalance = user.balanceCents + reverseDelta + newDelta;
    if (!config.allowNegativeBalance && tentativeBalance < 0) {
      throw new ApiError(400, 'Insufficient funds');
    }

    // Apply
    user.balanceCents = tentativeBalance;
    await user.save({ session });

    tx.type = newType;
    tx.amountCents = newAmountCents;
    if (description !== undefined) tx.description = description;
    if (occurredAt !== undefined) tx.occurredAt = new Date(occurredAt);
    await tx.save({ session });

    await session.commitTransaction();
    res.json({
      success: true,
      transaction: {
        id: tx._id,
        type: tx.type,
        amount: fromCents(tx.amountCents),
        description: tx.description,
        occurredAt: tx.occurredAt
      },
      balance: fromCents(user.balanceCents)
    });
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

export const deleteTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const tx = await Transaction.findOne({ _id: id, user: req.user._id }).session(session);
    if (!tx) throw new ApiError(404, 'Transaction not found');

    const user = await User.findById(req.user._id).session(session);
    if (!user) throw new ApiError(404, 'User not found');

    const reverseDelta = -deltaFor(tx.type, tx.amountCents);
    const tentativeBalance = user.balanceCents + reverseDelta;

    if (!config.allowNegativeBalance && tentativeBalance < 0) {
    }

    user.balanceCents = tentativeBalance;
    await user.save({ session });
    await tx.deleteOne({ session });

    await session.commitTransaction();
    res.json({ success: true, balance: fromCents(user.balanceCents) });
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});
