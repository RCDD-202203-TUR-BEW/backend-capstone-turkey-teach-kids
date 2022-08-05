const { body, check } = require('express-validator');

const validateSignup = [
  body('email')
    .isEmail()
    .withMessage('not a valid email address')
    .not()
    .isEmpty()
    .withMessage('Email should not be empty'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password should not be empty')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'i')
    .withMessage('Password must contain a number, uppercase and lowercase')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('username')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Username should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Username should not include spaces'),
  check('type')
    .isIn(['volunteer', 'ngo'])
    .withMessage('Invalid user type')
    .exists()
    .withMessage('User type is required'),
];

const validateSignin = [
  body('email')
    .isEmail()
    .withMessage('not a valid email address')
    .not()
    .isEmpty()
    .withMessage('Email should not be empty'),
  body('password').not().isEmpty().withMessage('Password should not be empty'),
];

module.exports = { validateSignup, validateSignin };
