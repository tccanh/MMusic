/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
// Define route callback
const providers = ["google", "facebook"];
const callbacksURL = providers.map(provider => `/${provider}/callback`);
const [googleURL, facebookURL] = callbacksURL;

// // Define routes.
// router.get("/", (req, res) => {
//   res.render("index", { user: req.user });
// });

// router.get("/login", (req, res) => {
//   res.render("index", { user: req.user });
// });

// Register User
// eslint-disable-next-line consistent-return
router.post("/register", (req, res) => {
  const errors = {};
  const { password, password2, username } = req.body;

  if (password === password2) {
    // eslint-disable-next-line consistent-return
    User.findOne({ username }).then(user => {
      if (user) {
        errors.email = "Username already exists";
        return res.status(400).json(errors);
      }
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // eslint-disable-next-line no-shadow
      User.createUser(newUser, (err, user) => {
        if (err) throw err;
        return res.json(user);
      });
    });
  } else {
    errors.password = "Passwords don't match";
    return res.status(500).json(errors);
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
