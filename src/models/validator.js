const { body } = require('express-validator');

const validatorSchema = [
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
  body('password2')
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
    .withMessage('passwords do not match'),
  body('username')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Username should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Username should not include spaces'),
];
module.exports = validatorSchema;
