/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// DONE
const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const Genre = require('../../models/Genre');
const { fileFilter, storage } = require('../../configs/uploadImage');

const upload = multer({ storage, fileFilter });
const validateGenre = require('../../validations/apis/genre');
// Get list genre
router.get('/', (req, res, next) => {
  Genre.find()
    .sort({ name: 1 })
    .then(genre => res.json(genre))
    .catch(err =>
      res.status(404).json({ nogenreFounds: `No genres found: ${err}` })
    );
});
router.get('/countAll', (req, res, next) => {
  Genre.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(404).json({ countGenres: `No genres found: ${err}` });
    }
    return res.json(count);
  });
});

// Post create or update image
router.post('/', upload.single('image'), async (req, res, next) => {
  const { errors, isValid } = validateGenre(req.body);
  const { name } = req.body;
  const newGenre = {};
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if (!req.file) {
    errors.FileUpload = 'Invalid file upload.';
    return res.status(400).json(errors);
  }
  try {
    await cloudinary.v2.uploader
      .upload(req.file.path, {
        folder: 'images/genres',
        width: 500,
        aspect_ratio: 1.1,
        crop: 'lfill'
      })
      .then(res_ => (newGenre.image = res_.secure_url));
  } catch (error) {
    errors.FileUpload = 'Error Upload Image';
    return res.status(400).json(errors);
  }

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

router.delete('/delete/:genre_id', (req, res, next) => {
  Genre.findByIdAndRemove(req.params.genre_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Genre not found: ${err}`));
});
module.exports = router;
