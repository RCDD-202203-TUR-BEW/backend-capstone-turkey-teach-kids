const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, err);
  console.log(err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
