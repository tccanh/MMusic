/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
const router = require("express").Router();
const passport = require("passport");

const User = require("../models/User");
// Define route callback
const providers = ["google", "facebook"];
const callbacksURL = providers.map(provider => `/${provider}/callback`);
const [googleURL, facebookURL] = callbacksURL;

// Define routes.
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("index", { user: req.user });
});

// Register User
router.post("/register", (req, res) => {
  const { password } = req.body;
  const { password2 } = req.body;

  if (password === password2) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      res.send(user).end();
    });
  } else {
    res
      .status(500)
      // eslint-disable-next-line quotes
      .send('{errors: "Passwords don\'t match"}')
      .end();
  }
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
  (req, res) => {
    // Successful authentication, redirect home.
    res.render("index", { user: req.user });
  }
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
  (req, res) => {
    // Successful authentication, redirect home.
    res.render("index", { user: req.user });
  }
);

module.exports = router;
