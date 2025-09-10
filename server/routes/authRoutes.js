import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  validate([
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Min 8 characters'),
    body('countryCode').trim().notEmpty().withMessage('Country code is required'),
    body('contactNumber').trim().notEmpty().withMessage('Contact number is required'),
    body('accountType').trim().notEmpty().isIn(['Single', 'Joint', 'Corporate']).withMessage('Account type is required'),
    body('secondaryEmail').if(body('accountType').equals('Joint')).isEmail().withMessage('Secondary email must be valid'),
    body('referral').optional().isString().trim().withMessage('Referral must be a string'),
  ]),
  register
);

// POST /api/auth/login
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ]),
  login
);

// POST /api/auth/me
router.get('/me', requireAuth, me);

export default router;
