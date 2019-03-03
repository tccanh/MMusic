/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// Define route callback
const providers = ["google", "facebook"];
const callbacksURL = providers.map(provider => `/${provider}/callback`);
const [googleURL, facebookURL] = callbacksURL;
// Validate
const validateRegister = require("../../validations/users/register");

// Local
/* POST login. */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log({ err, user });

      return res.status(400).json({
        message: "Something is not right",
        user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const payload = { id: user.id, name: user.name };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => res.json({ user, token: `Bearer ${token}` })
      );
    });
  })(req, res);
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.email = "Username already exists";
      return res.status(400).json(errors);
    }
    const newUser = new User({
      name: req.body.name,
      locals: {
        username: req.body.username,
        password: req.body.password
      },
      email: req.body.email,
      gender: "Male"
    });
    User.createHash(newUser, (err, user) => {
      if (err) throw err;
      return res.json(user);
    });
  });
});

/* Handle Logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  googleURL,
  passport.authenticate("google", { failureRedirect: "/login" }),
  // Successful authentication, redirect home.
  (req, res) => res.redirect("/")
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile"]
  })
);
router.get(
  facebookURL,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  // Successful authentication, redirect home.
  (req, res) => res.redirect("/")
);

module.exports = router;
