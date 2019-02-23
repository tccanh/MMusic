/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
const router = require("express").Router();
const passport = require("passport");

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
