/* eslint-disable implicit-arrow-linebreak */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const CONFIGS = require("./configs");

const User = require("../models/User");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        ...CONFIGS.GOOGLE_CONFIG
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ facebookId: profile.id }, (err, user) =>
          cb(err, user)
        );
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        ...CONFIGS.FACEBOOK_CONFIG
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ facebookId: profile.id }, (err, user) =>
          cb(err, user)
        );
      }
    )
  );
};
