const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');

const authController = require('../controllers/auth');

router.post('/signup/:type', authController.signup);
router.post('/login', authController.login);

module.exports = router;
