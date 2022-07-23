const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const logger = require('./utils/logger');

const app = express();

const port = process.env.NODE_LOCAL_PORT || 3000;

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  logger.info(`listening on port ${port}`);
});
