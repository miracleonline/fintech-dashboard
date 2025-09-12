import multer from "multer";
import path from "path";

// Allowed file types 
const FILE_TYPES = /jpeg|jpg|png|webp/;

// Max file size 
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB


const fileFilter = (req, file, cb) => {
  const extname = FILE_TYPES.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = FILE_TYPES.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, and WEBP image files are allowed."
      )
    );
  }
};

// Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
});

export default upload;
