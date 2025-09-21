// src/controllers/StatementController.js
import { listTransactions } from './transactionController.js';
import { fromCents } from '../utils/money.js';
import { getPagination } from '../utils/paginate.js';
import { generatePDFStatement } from '../utils/pdfGenerator.js'; 
import catchAsync from '../utils/catchAsync.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { config } from '../config/index.js';

export const downloadStatement = catchAsync(async (req, res) => {
  const { start, end, pages } = req.query;
  const { page, limit, skip } = getPagination(req.query, 10, 100); 

  const filter = { user: req.user._id };

  if (start || end) {
    filter.occurredAt = {};
    if (start) filter.occurredAt.$gte = new Date(start);
    if (end) filter.occurredAt.$lte = new Date(end);
  }

  const [items, total] = await Promise.all([
    Transaction.find(filter).sort({ occurredAt: -1, _id: -1 }).skip(skip).limit(limit),
    Transaction.countDocuments(filter),
  ]);

  // Generate PDF for the statement
  const pdfBuffer = await generatePDFStatement(items, total, start, end, pages, req.user);

  // Send PDF as response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=account_statement.pdf');
  res.send(pdfBuffer);
});
