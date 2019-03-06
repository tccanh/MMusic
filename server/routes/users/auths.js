/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const validateRegister = require("../../validations/users/register");

// Local
/* POST login. */
router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
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
      jwt.sign(
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

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      avatar
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        newUser.password = hash;
      });
    });
    new User(newUser)
      .save()
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  });
});
/* Handle Logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email"]
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // ----------------------------------------------------------
    req.login(req.user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const payload = { id: req.user.id, name: req.user.name };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => res.json({ user: req.user, token: `Bearer ${token}` })
      );
    });
    // ----------------------------------------------------------
    // return res.redirect("/");
  }
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "public_profile" })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // ----------------------------------------------------------
    req.login(req.user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const payload = { id: req.user.id, name: req.user.name };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => res.json({ user: req.user, token: `Bearer ${token}` })
      );
    });
    // ----------------------------------------------------------
    // return res.redirect("/");
  }
);

module.exports = router;
