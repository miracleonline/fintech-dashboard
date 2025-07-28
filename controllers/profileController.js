const User = require('../models/User'); 
exports.uploadProfileImage = async (req, res) => { 
try { 
const userId = req.user._id; 
const profilePath = req.file.path; 
const user = await User.findByIdAndUpdate( 
userId, 
{ profileImage: profilePath }, 
{ new: true } 
); 
res.json({ 
message: 'Profile image uploaded successfully', 
profileImage: user.profileImage 
}); 
} catch (error) { 
res.status(500).json({ error: 'Failed to upload profile image' }); 
} 
};

exports.uploadVideo = (req, res) => { 
if (!req.file) { 
return res.status(400).json({ message: 'No video uploaded' }); 
} 
res.json({ 
message: 'Video uploaded successfully', 
file: { 
originalname: req.file.originalname, 
filename: req.file.filename, 
path: req.file.path, 
size: req.file.size, 
mimetype: req.file.mimetype, 
}, 
}); 
};