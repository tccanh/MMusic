const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
// Define route callback
const providers = ["google", "facebook"];
const callbacksURL = providers.map(provider => `/${provider}/callback`);
const [googleURL, facebookURL] = callbacksURL;
// Validate
const validateRegister = require("../validations/register");

// Local
router.post("/login", passport.authenticate("local"), (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.json(req.user)
);

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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      return res.json(user);
    });
  });
});

/* Handle Logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.json("Logout Done");
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
