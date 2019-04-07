/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const Track = require('../../models/Track');
const Artist = require('../../models/Artist');
const User = require('../../models/User');
const Album = require('../../models/Album');
const Genre = require('../../models/Genre');
const { fileFilterPlus, storage } = require('../../configs/uploadImage');
const formatText = require('../../validations/formatText');
const isEmpty = require('../../validations/is-empty');

const upload = multer({ storage, fileFilterPlus });
const validateTrack = require('../../validations/apis/track');
// Get list track
router.get('/', (req, res) => {
  Track.find()
    .sort({ name: 1 })
    .then(track => res.json(track))
    .catch(err =>
      res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
    );
});
// Có nên chèn bảng xếp hạng việt nam vào đây k?
router.get('/top50', (req, res, next) => {
  // sort by views of tracks
  if (req.query.view === '1') {
    Track.find()
      .sort({ name: -1 })
      .limit(50)
      .then(list => res.json(list))
      .catch(err =>
        res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
      );
  } else {
    // Sort by liked of tracks
    // So array fields are sorted by the array length by default?

    Track.find()
      .sort({ likes: -1 })
      .sort({ views: -1 })
      .limit(50)
      .then(list => res.json(list))
      .catch(err =>
        res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
      );
  }
});
// View track and increase view 1 more
router.get('/:id', (req, res) => {
  Track.findById(req.params.id)
    .then(track => {
      // eslint-disable-next-line no-param-reassign
      track.views += 1;
      track.save().then(track_ => res.json(track_));
    })
    .catch(err =>
      res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
    );
});

// Track create or update image
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'track', maxCount: 1 }
  ]),
  async (req, res) => {
    const { errors, isValid } = validateTrack(req.body);
    const { name, artists, album, genre, country } = req.body;
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newTrack = {};
    newTrack.owner = req.user.id;
    if (name) newTrack.name = name;
    if (genre) {
      await Genre.findOne({ name: genre })
        .then(_genre => {
          newTrack.genres = { genre: _genre.id, name: _genre.name };
        })
        .catch(err => {
          errors.genre = `Genre ${genre} not found`;
          return res.status(400).json(errors);
        });
    }
    if (artists) {
      const listArtists = artists.split(',').map(arts => formatText(arts));
      console.log(listArtists);

      newTrack.artists = [];
      await listArtists.map(_arts => {
        Artist.findOne({ name: _arts })
          .then(__arts => {
            if (!isEmpty(__arts)) {
              newTrack.artists.unshift({
                artist: __arts.id,
                name: __arts.name
              });
            }
          })
          .catch(err => {
            errors.Albums = `Artist ${_arts} not found: ${err}`;
            return res.status(400).json(errors);
          });
      });
    }
    if (album) {
      await Album.findOne({ name: album })
        .then(_arts => {
          newTrack.albums = { album: _arts.id, name: _arts.name };
        })
        .catch(err => {
          errors.album = `Album ${album} not found`;
          return res.status(400).json(errors);
        });
    }
    if (country) newTrack.country = country;
    if (!req.files.track) {
      errors.FileUpload = 'Invalid file upload.';
      return res.status(400).json(errors);
    }
    try {
      await cloudinary.v2.uploader
        .upload(req.files.track[0].path, {
          resource_type: 'video',
          folder: 'media/music'
        })
        .then(res_ => {
          newTrack.link = res_.secure_url;
          newTrack.duration = res_.duration;
          newTrack.format = res_.format;
        });
    } catch (error) {
      errors.FileUpload = 'Error Upload Image';
      return res.status(400).json(errors);
    }

    if (!req.files.image) {
      errors.FileUpload = 'Invalid file upload.';
      return res.status(400).json(errors);
    }
    try {
      await cloudinary.v2.uploader
        .upload(req.files.image[0].path, {
          folder: 'images/tracks',
          width: 500,
          aspect_ratio: 1.1,
          crop: 'lfill'
        })
        .then(res_ => (newTrack.image = res_.secure_url));
    } catch (error) {
      errors.FileUpload = 'Error Upload Image';
      return res.status(400).json(errors);
    }

    new Track(newTrack)
      .save()
      .then(__track => res.json(__track))
      .catch(err => {
        errors.genre = `Error create: ${err}`;
        return res.status(400).json(errors);
      });
  }
);

router.post('/comment/:id', (req, res) => {
  //   const { errors, isValid } = validateCMT(req.body);
  // Check Validation
  //   if (!isValid) {
  //     // Return any errors with 400 status
  //     return res.status(400).json(errors);
  //   }
  Track.findById(req.params.id)
    .then(track => {
      const newComment = {
        text: req.body.text,
        user: req.user.id,
        name: req.user.name,
        avatar: req.body.avatar
      };
      // Add to comments array
      track.comments.unshift(newComment);
      track.save().then(_post => res.json(_post));
    })
    .catch(err => res.json({ noTrackFound: 'Not post found.' }));
});
router.delete('/comment/:id/:cmt_id', (req, res) => {
  User.findById(req.user.id)
    .then(_user => {
      Track.findById(req.params.id)
        .then(track => {
          if (
            track.comments.filter(
              cmt => cmt.id.toString() === req.params.cmt_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentNotExist: 'Comment is not exists' });
          }
          // Get remove
          const removeIndex = track.comments
            .map(cmt => cmt.id.toString())
            .indexOf(req.params.cmt_id);
          track.comments.splice(removeIndex, 1);
          track.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: 'Not post found.' });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: 'USER not found' }));
});

router.post('/like/:id', (req, res) => {
  User.findById(req.user.id)
    .then(_user => {
      Track.findById(req.params.id)
        .then(track => {
          if (
            track.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLike: 'User already liked this post' });
          }
          track.likes.unshift({ user: req.user.id });
          track.save().then(__track => res.json(__track));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: 'Not post found' });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: 'USER not found' }));
});
router.post('/unlike/:id', (req, res, next) => {
  User.findById(req.user.id)
    .then(_user => {
      Track.findById(req.params.id)
        .then(track => {
          if (
            track.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLike: 'You has not like this post yet.' });
          }
          const removeIndex = track.likes
            .map(value => value.user.toString())
            .indexOf(req.params.id);
          // Remove out array likes
          track.likes.splice(removeIndex, 1);
          track.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: 'Not post found.' });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: 'USER not found' }));
});

router.delete('/:track_id', (req, res, next) => {
  Track.findByIdAndRemove(req.params.track_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Track not found: ${err}`));
});

module.exports = router;
