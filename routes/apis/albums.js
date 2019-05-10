/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Album = require('../../models/Album');
const passport = require('passport');
const validateAlbum = require('../../validations/apis/album');
// Get list album
router.get('/', (req, res, next) => {
  Album.find()
    .sort({ name: -1 })
    .then(album => res.json(album))
    .catch(err =>
      res.status(404).json({ noalbumFounds: `No albums found: ${err}` })
    );
});

// Post create or update image
// eslint-disable-next-line consistent-return
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateAlbum(req.body);
    const { name, image } = req.body;
    const newAlbum = {};
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (name) newAlbum.name = name;
    if (image) newAlbum.image = image;

    Album.findOne({ name }).then(album => {
      if (album) {
        // Update
        Album.findOneAndUpdate(
          { _id: album.id },
          { $set: newAlbum },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json(`USER: ${req.user.id}::${err}`));
      } else {
        new Album(newAlbum)
          .save()
          .then(_album => res.json(_album))
          .catch(err => res.json({ CreateAlbumERROR: err }));
      }
    });
  }
);

router.delete(
  '/delete/:album_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Album.findByIdAndRemove(req.params.album_id)
      .then((haha, hihi) => res.json({ Success: true }))
      .catch(err => res.status(400).json(`Album not found: ${err}`));
  }
);
module.exports = router;
