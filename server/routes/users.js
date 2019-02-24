const express = require("express");
const passport = require("passport");

const router = express.Router();

// Endpoint to login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

// Endpoint to get current user
router.get("/user", (req, res) => {
  res.send(req.user);
});

// Endpoint to logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send(null);
});
module.exports = router;
