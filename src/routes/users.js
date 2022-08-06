const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const ErrorResponse = require('../utils/errorResponse');
const usersController = require('../controllers/users');

router.get('/', usersController.getUser);
module.exports = router;
