const express = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
const validateProfile = require("../../validations/profile");
const User = require("../../models/User");
const middleware = require("../../configs/middleware");

const router = express.Router();
// Storage image
const storage = multer.diskStorage({
  filename(req, file, next) {
    next(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

router.get("/update", middleware.isAuthenticated, (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.render("testProfile", { user: req.user })
);
// Sửa thông tin
router.post(
  "/update",
  middleware.isAuthenticated,
  upload.single("image"),
  (req, res, next) => {
    const { errors, isValid } = validateProfile(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const oldProfile = req.user;
    if (req.body.name) oldProfile.name = req.body.name;
    if (!req.user.username) {
      if (req.body.username) oldProfile.username = req.body.username;
    }
    if (req.body.email) oldProfile.email = req.body.email;
    if (req.body.gender) oldProfile.gender = req.body.gender;
    // Upload avatar
    // if (req.body.image) {
    // eslint-disable-next-line no-undef
    if (document.getElementById("image").files.length !== 0) {
      cloudinary.uploader.upload(req.file.path, res => {
        oldProfile.avatar = res.secure_url;
        console.log(res);
      });
    }
    // console.log(oldProfile);

    User.findOneAndUpdate(
      {
        id: req.user.id
      },
      {
        $set: oldProfile
      },
      { new: true }
    )
      .then(_user => res.json(_user))
      .catch(err => res.json(err));
  }
);
// Xoá tài khoản
// Lấy thông tin
router.get("/", (req, res, next) => {
  res.json(res.user);
});
// Lấy danh sách user
module.exports = router;
