const GoogleStrategy = require("passport-google-oauth20").Strategy;
const CONFIGS = require("./configs");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        ...CONFIGS.GOOGLE_CONFIG
      },
      (accessToken, refreshToken, profile, cb) => {
        // const Info = {
        //   accTOKEN: accessToken,
        //   refTOKEN: refreshToken,
        //   PROFILE: profile
        // };
        const user = profile.displayName;
        return cb(null, user);
      }
    )
  );
};
