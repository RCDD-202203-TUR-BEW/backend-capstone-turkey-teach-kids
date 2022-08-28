const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const ErrorResponse = require('../utils/errorResponse');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('application/pdf')
    ) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  },
}).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]);

exports.upload = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new ErrorResponse(err.message, 400));
    }
    if (!req.files) {
      return next();
    }
    if (req.files.avatar) {
      const avatarName = `https://storage.googleapis.com/teach-capstone/${uuidv4()}.${
        req.files.avatar[0].mimetype.split('/')[1]
      }`;
      const avatarFile = bucket.file(avatarName);
      await avatarFile.save(req.files.avatar[0].buffer);
      req.body.avatar = avatarFile.name;
    }
    if (req.files.cv) {
      const cvName = `https://storage.googleapis.com/teach-capstone/${uuidv4()}.${
        req.files.cv[0].mimetype.split('/')[1]
      }`;
      const cvFile = bucket.file(cvName);
      await cvFile.save(req.files.cv[0].buffer);
      req.body.cv = cvFile.name;
    }
    return next();
  });
};
