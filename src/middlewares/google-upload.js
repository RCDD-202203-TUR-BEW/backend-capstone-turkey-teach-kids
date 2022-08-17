const multer = require('multer');
const multerGoogleCloudStorage = require('multer-google-storage');
const { v4: uuidv4 } = require('uuid');

const uploadHandler = multer({
  storage: multerGoogleCloudStorage.storageEngine({
    bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

module.exports = uploadHandler;
