<<<<<<< HEAD
const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const connectToMongo = require('./db/connection');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

connectToMongo();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', routes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`listening on port ${port}`);
  });
}
module.exports = app;
