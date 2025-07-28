const express = require('express'); 
const router = express.Router(); 
const { makeTransaction } = 
require('../controllers/transactionController'); 
const { protect } = require('../middleware/authMiddleware'); 
// All routes protected — user must be logged in 
/** 
* @swagger 
* /transactions: 
*   post: 
*     summary: Perform a credit or debit transaction 
*     tags: [Transactions] 
*     security: 
*       - bearerAuth: [] 
*     requestBody: 
*       required: true 
*       content: 
*         application/json: 
*           schema: 
*             type: object 
*             properties: 
*               type: 
*                 type: string 
*                 enum: [credit, debit] 
*               amount: 
*                 type: number 
*     responses: 
*       201: 
*         description: Transaction successful 
*       400: 
*         description: Validation error 
*/ 
router.post('/', protect, makeTransaction);  
module.exports = router; 