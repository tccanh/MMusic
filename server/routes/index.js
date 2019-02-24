const express = require("express");

const router = express.Router();
const middleware = require("../configs/middleware");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/home", middleware.isAuthenticated, (req, res) => {
  res.render("home", { user: req.user });
});
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

module.exports = router;
