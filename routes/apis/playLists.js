/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const PlayList = require('../../models/PlayList');
const Album = require('../../models/Album');
const User = require('../../models/User');
const Track = require('../../models/Track');
const { fileFilter, storage } = require('../../configs/uploadImage');

const upload = multer({ storage, fileFilter });
const validatePlayList = require('../../validations/apis/playList');
// Get list playList
router.get('/', (req, res, next) => {
  PlayList.find()
    .sort({ date: -1 })
    .then(playList => res.json(playList))
    .catch(err =>
      res.status(404).json({ noplayListFounds: `No playLists found: ${err}` })
    );
});

// Post create or update image
router.post('/', upload.single('image'), async (req, res, next) => {
  const { errors, isValid } = validatePlayList(req.body);
  const { name, publics, description } = req.body;
  const newPlayList = {};
  if (!isValid) {
    return res.status(400).json(errors);
  }
  newPlayList.owner = req.user.id;
  if (name) newPlayList.name = name;
  if (description) newPlayList.description = description;
  if (publics) newPlayList.public = publics;
  if (!req.file) {
    errors.FileUpload = 'Invalid file upload.';
    return res.status(400).json(errors);
  }
  try {
    await cloudinary.v2.uploader
      .upload(req.file.path, { folder: 'images/playlists' })
      .then(res_ => (newPlayList.image = res_.secure_url));
  } catch (error) {
    errors.FileUpload = 'Error Upload Image';
    return res.status(400).json(errors);
  }

  new PlayList(newPlayList)
    .save()
    .then(playList => res.json(playList))
    .catch(err => {
      errors.CreatePlayList = err;
      return errors;
    });
});

router.post('/add/:id/:track_id', (req, res, next) => {
  PlayList.findById(req.params.id)
    .then(playList => {
      Track.findById(req.params.track_id)
        .then(track => {
          playList.tracks.unshift({ track: track.id });
          playList.save().then(__playList => res.json(__playList));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: 'Not post found' });
        });
    })
    .catch(err =>
      res.status(400).json({ PlaylistErrors: 'PlayList not found' })
    );
});
router.post('/remove/:id/:track_id', (req, res, next) => {
  PlayList.findById(req.params.id)
    .then(playList => {
      const removeIndex = playList.tracks
        .map(value => value.track.id)
        .indexOf(req.params.track_id);
      // Remove out array likes
      playList.tracks.splice(removeIndex, 1);
      playList.save().then(pl => res.json(pl));
    })
    .catch(err => {
      res.status(404).json({ noPostFound: 'Not post found.' });
    });
});

router.delete('/delete/:playList_id', (req, res, next) => {
  PlayList.findByIdAndRemove(req.params.playList_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`PlayList not found: ${err}`));
});
module.exports = router;
