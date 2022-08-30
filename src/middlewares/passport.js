const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: process.env.GAPP_CLIENT_CALLBACK,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, callBack) => {
      const currentUser = await User.findOne({
        providerId: `google-${profile.id}`,
      });
      if (currentUser) {
        callBack(null, currentUser);
      } else {
        const user = new User({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          provider: 'Google',
          providerId: `google-${profile.id}`,
          username: profile.emails[0].value,
          type: req.query.state === 'ngo' ? 'Ngo' : 'Volunteer',
        });
        await user.save();
        callBack(null, user);
      }
    }
  )
);
