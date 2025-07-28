const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/upload'); 
const { uploadProfileImage, uploadVideo } = require('../controllers/profileController'); 
const { protect } = require('../middleware/authMiddleware'); 
router.post('/upload-profile', protect, upload.single('profile'), uploadProfileImage);
router.post('/upload-video', upload.single('video'), uploadVideo); 
module.exports = router;