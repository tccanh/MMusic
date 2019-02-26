const express = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
const validateProfile = require("../../validations/profile");
const User = require("../../models/User");
const middleware = require("../../configs/middleware");

const router = express.Router();

router.get("/update", middleware.isAuthenticated, (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.render("testProfile", { user: req.user })
);
// Sửa thông tin

// Xoá tài khoản
// Lấy thông tin
router.get("/", (req, res, next) => {
  res.json(res.user);
});
// Lấy danh sách user
module.exports = router;
