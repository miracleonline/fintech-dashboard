import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  createTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';
import { downloadStatement } from '../controllers/statementController.js';

const router = Router();

router.use(requireAuth);

// POST /api/transactions
router.post(
  '/',
  validate([
    body('type').isIn(['credit', 'debit']).withMessage('type must be credit or debit'),
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be > 0'),
    body('description').optional().isString().isLength({ max: 240 }),
    body('occurredAt').optional().isISO8601().toDate(),
  ]),
  createTransaction
);

// GET /api/transactions (List with pagination & filters)
router.get('/', listTransactions);

// PATCH /api/transactions/:id
router.patch(
  '/:id',
  validate([
    param('id').isMongoId(),
    body('type').optional().isIn(['credit', 'debit']),
    body('amount').optional().isFloat({ gt: 0 }),
    body('description').optional().isString().isLength({ max: 240 }),
    body('occurredAt').optional().isISO8601().toDate(),
  ]),
  updateTransaction
);

// DELETE /api/transactions/:id
router.delete('/:id', validate([param('id').isMongoId()]), deleteTransaction);

// GET /api/transactions/download 
router.get('/download', downloadStatement);

export default router;
