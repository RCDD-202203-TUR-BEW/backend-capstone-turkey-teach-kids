const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Volunteer = require('../models/volunteer');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, callBack) => {
      const currentUser = await Volunteer.findOne({ providerId: profile.id });

      if (currentUser) {
        callBack(null, currentUser);
      } else {
        const newVolunteer = new Volunteer({
          email: profile.json.email,
          providerId: profile.id,
          firstName: profile.json.given_name,
          lastName: profile.json.family_name,
          provider: profile.provider,
        });

        newVolunteer.save();
        callBack(null, newVolunteer);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  Volunteer.findById(id).then((user) => {
    cb(null, user);
  });
});
