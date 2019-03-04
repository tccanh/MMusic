/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require("express").Router();
const cloudinary = require("cloudinary");
const multer = require("multer");
const Genre = require("../../models/Genre");
const { fileFilter, storage } = require("../../configs/uploadImage");

const upload = multer({ storage, fileFilter });
const validateGenre = require("../../validations/apis/genre");
// Get list genre
router.get("/", (req, res, next) => {
  Genre.find()
    .sort({ date: -1 })
    .then(genre => res.json(genre))
    .catch(err =>
      res.status(404).json({ nogenreFounds: `No genres found: ${err}` })
    );
});

// Post create or update image
router.post("/", upload.single("image"), async (req, res, next) => {
  const { errors, isValid } = validateGenre(req.body);
  const { name } = req.body;
  const newGenre = {};
  if (!isValid) {
    return res.status(400).json(errors);
  }

  await cloudinary.uploader.upload(req.file.path, _res => {
    newGenre.image = _res.secure_url;
  });

  Genre.findOne({ name }).then(genre => {
    if (genre) {
      // Update
      Genre.findOneAndUpdate(
        { _id: genre.id },
        { $set: newGenre },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err => res.json(`USER: ${req.user.id}::${err}`));
    } else {
      if (req.body.name) newGenre.name = req.body.name;
      new Genre(newGenre)
        .save()
        .then(_genre => res.json(_genre))
        .catch(err => res.json({ CreateGenreERROR: err }));
    }
  });
});

router.delete("/delete/:genre_id", (req, res, next) => {
  Genre.findByIdAndRemove(req.params.genre_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Genre not found: ${err}`));
});
module.exports = router;
