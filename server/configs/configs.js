/* eslint-disable arrow-body-style */
const providers = ["google", "facebook"];

const callbacks = providers.map(
  provider => `http://localhost:3000/auth/${provider}/callback`
);
const [googleURL, facebookURL] = callbacks;

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
};

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ["id", "name", "displayName", "birthday", "gender", "picture"],
  callbackURL: facebookURL
};
