const mongoose = require('mongoose');
const logger = require('../utils/logger');

const url = process.env.IS_JEST ? process.env.TEST_DB_URL : process.env.DB_URL;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once('open', () => {
    logger.info(`Database connection established ${url}`);
  });

  db.on('error', (err) => {
    console.error('Database connection error: ', err);
    logger.info(`Database connection established ${url}`);
  });

  db.on('error', (err) => {
    logger.error(`Database connection error`, err);
  });
};

module.exports = connectToMongo;
