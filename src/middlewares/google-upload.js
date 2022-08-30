const multer = require('multer');

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
});

exports.upload = upload;
