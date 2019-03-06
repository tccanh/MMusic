/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable implicit-arrow-linebreak */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const CONFIGS = require("./configs");

const User = require("../models/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
      })
      .catch(er => done(er, false));
  });
  passport.use(
    new GoogleStrategy(
      {
        ...CONFIGS.GOOGLE_CONFIG
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);
          // if there is no user found with that google id, create them
          const newUser = {};
          newUser.googleID = profile.id;
          newUser.name = `${profile.name.familyName} ${profile.name.givenName}`;
          const Avatar_ = profile._json.image.url;
          newUser.avatar = Avatar_.substr(0, Avatar_.lastIndexOf("?sz=50"));
          newUser.email = profile._json.emails[0].value;
          newUser.gender = profile.gender;
          new User(newUser)
            .save()
            .then(user => done(null, user))
            .catch(err => done(err, false));
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
        User.findOne({ facebookID: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);
          const newUser = {};
          newUser.facebookID = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;

          newUser.avatar = `http://graph.facebook.com/${
            profile.id
          }/picture?type=large`;

          new User(newUser).save().then(user => done(null, user));
        });
      }
    )
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      (username, password, cb) =>
        User.findOne({ username }).then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username."
            });
          }
          bcrypt.compare(password, user.password, (err, isMath) => {
            if (err) return cb(err, false, { message: err });
            if (isMath) {
              return cb(null, user, { message: "Logged In Successfully" });
            }
            return cb(null, false, {
              message: "Incorrect password."
            });
          });
        })
    )
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      (JWTpayload, done) => {
        User.findById(JWTpayload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => {
            done(err, false);
          });
      }
    )
  );
};
