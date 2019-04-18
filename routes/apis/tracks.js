/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
const router = require('express').Router();
const Track = require('../../models/Track');
const Artist = require('../../models/Artist');
const User = require('../../models/User');
const Album = require('../../models/Album');
const Genre = require('../../models/Genre');
const formatText = require('../../validations/formatText');
const isEmpty = require('../../validations/is-empty');

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
router.post('/', async (req, res) => {
  const { errors, isValid } = validateTrack(req.body);
  const {
    name,
    image,
    artists,
    authors,
    album,
    genre,
    country,
    released,
    link,
    duration,
    format,
    bit_rate,
    bytes
  } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTrack = {};
  newTrack.owner = req.user.id;
  if (name) newTrack.name = name;
  if (image) newTrack.image = image;
  if (genre) {
    var genreSplit = genre.split(',');
    newTrack.genre = genreSplit[0];
  }
  if (link) newTrack.link = link;
  if (format) newTrack.format = format;
  if (bit_rate) newTrack.bit_rate = bit_rate;
  if (bytes) newTrack.bytes = bytes;
  if (duration) newTrack.duration = duration;
  if (country) newTrack.country = country;
  if (released) newTrack.released = released;
  newTrack.authors = authors.split(',').map(auth => formatText(auth));

  if (artists) {
    const listArtists = artists.split(',').map(arts => formatText(arts));
    const newListArtists = [];
    await listArtists.map(_arts => {
      Artist.findOne({ name: _arts })
        .then(__arts => {
          if (!isEmpty(__arts)) {
            newListArtists.unshift({
              artist: __arts.id,
              name: __arts.name
            });
          } else {
            const newArtist = {
              name: _arts,
              image: image,
              genres: [genreSplit[1]]
            };
            new Artist(newArtist)
              .save()
              .then(__arts => {
                newListArtists.unshift({
                  artist: __arts._id,
                  name: __arts.name
                });
              })
              .catch(err => res.json({ CreateAlbumERROR: err }));
          }
        })
        .then(() => {
          newTrack.artists = newListArtists;
        })
        .catch(err => {
          errors.artists = `Artist ${_arts} not found: ${err}`;
          return res.status(400).json(errors);
        });
    });
  }
  if (album) {
    let albumID;
    await Album.findOne({ name: album })
      .then(__alb => {
        if (!isEmpty(__alb)) {
          albumID = __alb.id;
        } else {
          const newAlbum = {
            name: album,
            image: image
          };
          new Album(newAlbum)
            .save()
            .then(_album => {
              albumID = _album.id;
            })
            .catch(err => res.json({ CreateAlbumERROR: err }));
        }
      })
      .then(() => {
        newTrack.album = albumID;
      })
      .catch(err => {
        errors.Albums = `Album ${album} not found: ${err}`;
        return res.status(400).json(errors);
      });
  }
  await new Track(newTrack)
    .save()
    .then(__track => res.json(__track))
    .catch(err => {
      errors.track = `FUCK : ${err}`;
      return res.status(400).json(errors);
    });
});

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
