/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
// DONE
const router = require('express').Router();
const passport = require('passport');
const cloudinary = require('cloudinary');
const multer = require('multer');
const Genre = require('../../models/Genre');
const Track = require('../../models/Track');
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
// Get by name
router.get('/:name', (req, res, next) => {
  const { name } = req.params;
  Genre.findOne({ name })
    .then(genre => {
      Track.find({ genre: genre.id }).then(tracks => {
        return res.json({ tracks, genre });
      });
    })
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

// @route   POST api/genre
// @desc    Create or edit user genre
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGenre(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const { name, image, description } = req.body;
    // Get fields
    const genreFields = {};
    if (name) genreFields.name = name;
    if (image) genreFields.image = image;
    if (description) genreFields.description = description;

    Genre.findOne({ name }).then(genre => {
      if (genre) {
        // Update
        Genre.findOneAndUpdate(
          { name },
          { $set: genreFields },
          { new: true }
        ).then(genre__ => res.json(genre__));
      } else {
        // Create
        new Genre(genreFields).save().then(genre_ => res.json(genre_));
      }
    });
  }
);
router.delete(
  '/delete/:genre_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Genre.findByIdAndRemove(req.params.genre_id)
      .then((haha, hihi) => res.json({ Success: true }))
      .catch(err => res.status(400).json(`Genre not found: ${err}`));
  }
);
module.exports = router;
