const express = require('express');
const passport = require('passport');

const router = express.Router();
const { validate } = require('../middlewares/bodyValidator');
const authController = require('../controllers/auth');
const { isAuth } = require('../middlewares/auth');
const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validatorSchemas');

require('../middlewares/passport');
// It handle redirecting the user to google OAuth consent page.

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email', 'openid'],
  })
);
// It  sets an authentication cookie that holds the user JWT.
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.authenticationCookie
);

router.get('/profile', isAuth, (req, res) => {
  res.send(req.user);
});

// Authenticated only endpoint that clears the authentication cookie and log the user out.
router.post('/logout', isAuth, authController.logout);

router.post(
  ['/signup/volunteer', '/signup/ngo'],
  validateSignup,
  validate,
  authController.signup
);

router.post('/login', validateSignin, validate, authController.login);

module.exports = router;
