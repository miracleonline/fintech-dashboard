const multer = require('multer'); 
const path = require('path'); 
// Set storage engine 
const storage = multer.diskStorage({ 
destination: function (req, file, cb) { 
cb(null, 'uploads/'); // Save in 'uploads' folder 
}, 
filename: function (req, file, cb) { 
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); 
cb(null, uniqueSuffix + path.extname(file.originalname)); // unique.jpg 
} 
}); 
// File filter: only images 
const fileFilter = (req, file, cb) => { 
const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv/; 
const ext = 
allowedTypes.test(path.extname(file.originalname).toLowerCase()); 
const mime = allowedTypes.test(file.mimetype); 
if (ext && mime) { 
cb(null, true); 
} else { 
cb(new Error('Only image files are allowed!')); 
} 
}; 
const upload = multer({ storage, fileFilter }); 
module.exports = upload; 
