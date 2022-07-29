const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Volunteer = require('../models/volunteer');
const Ngo = require('../models/ngo');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, callBack) => {
      if (Volunteer) {
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
        passport.serializeUser((volunteer, cb) => {
          cb(null, volunteer);
        });

        passport.deserializeUser((volunteer, cb) => {
          cb(null, volunteer);
        });
      }
      if (Ngo) {
        const currentUser = await Ngo.findOne({ providerId: profile.id });

        if (currentUser) {
          callBack(null, currentUser);
        } else {
          const newNgo = new Ngo({
            email: profile.json.email,
            name: profile.displayName,
            providerId: profile.id,
            provider: profile.provider,
          });

          newNgo.save();
          callBack(null, newNgo);
        }
        passport.serializeUser((ngo, cb) => {
          cb(null, ngo);
        });

        passport.deserializeUser((ngo, cb) => {
          cb(null, ngo);
        });
      }
    }
  )
);
// Implement google authentication
// Fixes #10
