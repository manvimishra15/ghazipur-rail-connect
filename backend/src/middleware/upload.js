const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.env.UPLOADS_PATH || './uploads', folder));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  });

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const pdfFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === '.pdf' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const anyFileFilter = (req, file, cb) => cb(null, true);

const uploadImage = (folder) => multer({ storage: storage(folder), fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadPDF = (folder) => multer({ storage: storage(folder), fileFilter: pdfFilter, limits: { fileSize: 20 * 1024 * 1024 } });
const uploadAny = (folder) => multer({ storage: storage(folder), fileFilter: anyFileFilter, limits: { fileSize: 20 * 1024 * 1024 } });

module.exports = { uploadImage, uploadPDF, uploadAny };
