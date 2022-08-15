const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const passport = require('passport');
const multer = require('multer');
const multerGoogleCloudStorage = require('multer-google-storage');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const connectToMongo = require('./db/connection');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');
require('./middlewares/passport');

connectToMongo();

const app = express();
const uploadHandler = multer({
  storage: multerGoogleCloudStorage.storageEngine({
    bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    filename: (req, file, cb) => {
      cb(null, `projectimages/${Date.now()}_${file.originalname}`);
    },
  }),
});
const port = process.env.PORT || 3000;

app.post('/upload', uploadHandler.any(), (req, res) => {
  res.json({
    success: true,
    data: req.files,
  });
});

app.use(bodyParser.json());

app.use(cookieParser(process.env.SECRET_KEY));
app.use(encryptCookieNodeMiddleware(process.env.SECRET_KEY));
app.use(passport.initialize());

app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`listening on port ${port}`);
  });
}
module.exports = app;
