// routes/user.js
const express = require("express");
const cloudinary = require("cloudinary");
const multer = require("multer");
const validateProfile = require("../../validations/profile");
const User = require("../../models/User");

const router = express.Router();

// Storage image=================================================================================
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
// Storage image=================================================================================
/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* GET user profile. */
router.get("/profile", (req, res, next) => {
  res.json(req.user);
});
router.post("/update", upload.single("image"), async (req, res, next) => {
  const { errors, isValid } = validateProfile(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { image } = req.body;
  const oldProfile = req.user;
  if (req.body.name) oldProfile.name = req.body.name;
  if (req.body.email) oldProfile.email = req.body.email;
  if (req.body.gender) oldProfile.gender = req.body.gender;
  console.log(`HEllo: ${image}`);

  // Upload avatar
  // if (req.body.image) {
  // eslint-disable-next-line no-undef
  if (true) {
    await cloudinary.uploader.upload(req.file.path, res => {
      oldProfile.avatar = res.secure_url;
    });
  }

  await User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    {
      $set: oldProfile
    },
    { new: true }
  )
    .then(_user => res.json(_user))
    .catch(err => res.json(err));
});

module.exports = router;
