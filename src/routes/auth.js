const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { validate } = require('../middlewares/express-validator-err');
const authController = require('../controllers/auth');
const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validatorSchemas');

router.post('/signup/:type', validateSignup, validate, authController.signup);
router.post('/login', validateSignin, validate, authController.login);

module.exports = router;
