/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable implicit-arrow-linebreak */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const CONFIGS = require("./configs");

const User = require("../models/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        ...CONFIGS.GOOGLE_CONFIG
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ "google.id": profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);

          // if there is no user found with that google id, create them
          const newUser = new User();
          const fullName = `${profile.name.familyName} ${
            profile.name.givenName
          }`;
          // set all of the google information in our user model
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name = fullName;
          const smallAvatar = profile._json.image.url;
          newUser.avatar = smallAvatar.substr(
            0,
            smallAvatar.lastIndexOf("?sz=50")
          );
          newUser.name = fullName;
          if (
            // eslint-disable-next-line operator-linebreak
            typeof profile.emails !== "undefined" &&
            profile.emails.length > 0
          ) {
            newUser.google.email = profile.emails[0].value;
          }

          // save our user to the database
          newUser.save(err => {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        ...CONFIGS.FACEBOOK_CONFIG
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ "facebook.id": profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);

          // if there is no user found with that facebook id, create them
          const newUser = new User();

          // set all of the facebook information in our user model
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          newUser.facebook.name = profile.displayName;
          newUser.avatar = `http://graph.facebook.com/${
            profile.id
          }/picture?type=large`;
          newUser.name = profile.displayName;
          if (
            // eslint-disable-next-line operator-linebreak
            typeof profile.emails !== "undefined" &&
            profile.emails.length > 0
          ) {
            newUser.facebook.email = profile.emails[0].value;
          }

          // save our user to the database
          newUser.save(err => {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      }
    )
  );
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "Unknown User" });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Invalid password" });
        });
      });
    })
  );
};
