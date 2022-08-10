const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Volunteer = require('../models/volunteer');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: process.env.GAPP_CLIENT_CALLBACK,
    },
    async (accessToken, refreshToken, profile, callBack) => {
      const currentUser = await Volunteer.findOne({ providerId: profile.id });

      if (currentUser) {
        callBack(null, currentUser);
      } else {
        const newVolunteer = new Volunteer({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          provider: 'Google',
          providerId: `google-${profile.id}`,
        });

        await newVolunteer.save();
        callBack(null, newVolunteer);
      }
    }
  )
);
