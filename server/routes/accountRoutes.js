import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getBalance } from '../controllers/accountController.js';

const router = Router();
router.get('/balance', requireAuth, getBalance);
export default router;
