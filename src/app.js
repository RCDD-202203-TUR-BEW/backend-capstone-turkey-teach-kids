const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const connectToMongo = require('./db/connection');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

connectToMongo();

const app = express();

const port = process.env.PORT || 3000;

app.use('/api', routes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
