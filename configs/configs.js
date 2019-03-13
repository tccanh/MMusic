/* eslint-disable arrow-body-style */
const providers = ['google', 'facebook'];

const callbacks = providers.map(
  provider => `http://localhost:5000/auth/${provider}/callback`
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
  profileFields: [
    'id',
    'name',
    'displayName',
    'birthday',
    'gender',
    'picture',
    'email'
  ],
  callbackURL: facebookURL
};
exports.CLODINARY_CONFIG = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
};
