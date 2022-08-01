const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const logger = require('./utils/logger');
const swaggerDocument = require('../swagger.json');

require('dotenv').config();

const app = express();

const port = process.env.NODE_LOCAL_PORT || 3000;

app.use('/api', routes);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
