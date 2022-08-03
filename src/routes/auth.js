const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const { validate } = require('../middlewares/express-validator-err');
const validatorSchema = require('../models/validator');
const authController = require('../controllers/auth');

router.post('/signup/:type', validatorSchema, validate, authController.signup);
router.post('/login', validatorSchema, validate, authController.login);

module.exports = router;
