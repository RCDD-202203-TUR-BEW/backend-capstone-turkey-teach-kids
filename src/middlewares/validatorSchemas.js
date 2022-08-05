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

const validateAddEvent = [
  body('avatar').not().isEmpty().withMessage('Avatar should not be empty'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Avatar should not be empty')
    .isLength({ min: 120 })
    .withMessage('Description must be at least 120 characters long'),
  body('location').not().isEmpty().withMessage('Location should not be empty'),
  body('launchDate').not().isEmpty().withMessage('Date should not be empty'),
  body('topic').not().isEmpty().withMessage('Topic should not be empty'),
];

module.exports = { validateSignup, validateSignin, validateAddEvent };
