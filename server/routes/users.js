const express = require("express");

const router = express.Router();

// Endpoint to get current user
router.get("/user", (req, res) => {
  res.json(req.user);
});

module.exports = router;
