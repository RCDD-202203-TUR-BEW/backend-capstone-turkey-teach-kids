const express = require('express');
const passport = require('passport');

const router = express.Router();

const googleAuthController = require('../controllers/googleAuth');

const { checkAuth } = require('../middlewares/validation');

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
  googleAuthController.authenticationCookie
);

// Authenticated only endpoint that responds with a user object as specified in the user schema.
router.get('/me', checkAuth, googleAuthController.loggedInUser);

// Authenticated only endpoint that clears the authentication cookie and log the user out.
router.get('/logout', checkAuth, googleAuthController.logout);

module.exports = router;
