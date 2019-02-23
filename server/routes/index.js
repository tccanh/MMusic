const express = require("express");

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
  res.render("index", { user: "Express" });
});

module.exports = router;
