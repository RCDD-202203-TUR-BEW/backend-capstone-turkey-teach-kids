const express = require('express');
require('express-async-errors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const connectToMongo = require('./db/connection');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const logger = require('./utils/logger');
require('dotenv').config();
const swaggerDocument = require('../swagger.json');

const app = express();

const port = process.env.PORT || 3000;

app.use('/api', routes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  logger.info(`listening on port ${port}`);
  connectToMongo();
});
