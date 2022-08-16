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

const validateProfile = [
  body('firstName')
    .optional()
    .not()
    .isEmpty()
    .withMessage('First name should not be empty')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastName')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Last name should not be empty')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Name should not be empty')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('username')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Username should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Username should not include spaces'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('not a valid email address')
    .not()
    .isEmpty()
    .withMessage('Email should not be empty'),
  body('phone')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Phone number should not be empty')
    .isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 characters long'),
  body('location')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Location must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Location should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Location should not include spaces'),
  body('cv')
    .optional()
    .isLength({ min: 4 })
    .withMessage('CV must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('CV should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('CV should not include spaces'),
  body('description')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Description must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Description should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Description should not include spaces'),
  body('areaOfExp')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Area of exp must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Area of exp should not be empty'),
  body('avatar')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Avatar must be at least 4 characters long')
    .not()
    .isEmpty()
    .withMessage('Avatar should not be empty')
    .custom((value) => !/\s/.test(value))
    .withMessage('Avatar should not include spaces'),
];

module.exports = { validateSignup, validateSignin, validateProfile };
