const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');

const usersController = require('../controllers/users');

router.get('/', usersController.getUser);
router.post('/signup', usersController.signup);

module.exports = router;
