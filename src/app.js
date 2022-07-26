const express = require('express');
const cors = require('cors');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const passport = require('passport');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const connectToMongo = require('./db/connection');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');
require('./middlewares/passport');

connectToMongo();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://3000-recodedorg-teachkidscap-3lpmv1hggzp.ws-eu63.gitpod.io',
  'https://reach-teach-kids.netlify.app',
];

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
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
