// routes/authRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const { register, login } = require('../controllers/authController'); 
router.post('/register', register); 

/** 
* @swagger 
* /auth/login: 
*   post: 
*     summary: Login a user and receive JWT 
*     tags: [Auth] 
*     
requestBody: 
*       required: true 
*       content: 
*         application/json: 
*           schema: 
*             type: object 
*             required: 
*               
*               - username - password 
*             properties: 
*               username: 
*                 type: string 
*               password: 
*                 type: string 
*     responses: 
*       200: 
*         description: Login successful 
*       401: 
*         description: Invalid credentials 
*/
router.post('/login', login); 
module.exports = router;