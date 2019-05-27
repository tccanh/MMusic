/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const cloudinary = require('cloudinary');
const passport = require('passport');
const multer = require('multer');
const Artist = require('../../models/Artist');
const Track = require('../../models/Track');
const Album = require('../../models/Album');
const User = require('../../models/User');
const { fileFilter, storage } = require('../../configs/uploadImage');
const formatText = require('../../validations/formatText');
const isEmpty = require('../../validations/is-empty');

const upload = multer({ storage, fileFilter });
const validateArtist = require('../../validations/apis/artist');
// Get list artist
router.get('/', (req, res, next) => {
  Artist.find()
    .sort({ name: -1 })
    .then(artist => res.json(artist))
    .catch(err =>
      res.status(404).json({ noartistFounds: `No artists found: ${err}` })
    );
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Artist.findById(id)
    .then(artist =>
      Track.find({ 'artists.name': artist.name })
        .populate('album', 'name')
        .then(tracks => {
          return res.json({ tracks, artist });
        })
        .catch(err =>
          res.status(404).json({ notracksFounds: `No artists found: ${err}` })
        )
    )
    .catch(err =>
      res.status(404).json({ noartistFounds: `No artists found: ${err}` })
    );
});
router.get('/countAll', (req, res, next) => {
  Artist.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(404).json({ countArtists: `No artists found: ${err}` });
    }
    return res.json(count);
  });
});

// Post create or update image
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateArtist(req.body);
    const { name, genres, description, albums, image } = req.body;
    const newArtist = {};
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (description) newArtist.description = description;
    if (image) newArtist.image = image;
    let listGenres;
    if (genres) {
      listGenres = genres.split(',').map(genr => formatText(genr));
    }
    if (albums) {
      const listAlbums = albums.split(',').map(album => formatText(album));
      const newListAlbums = [];
      const newListGenres = [];
      Promise.all(
        listAlbums.map(async _alb => {
          try {
            const temp = await Album.findOne({ name: _alb });
            if (!isEmpty(temp)) {
              // console.log('BEFORE: ', temp);

              newListAlbums.unshift(temp.id);
            } else {
              const newAlb = new Album({
                name: _alb,
                image
              });
              const temp2 = await newAlb.save();
              // console.log('AFTER: ', temp2);
              newListAlbums.unshift(temp2.id);
            }
          } catch (error) {
            // console.log(error);
          }
        }),
        listGenres.map(async _gen => {
          try {
            if (!isEmpty(temp)) {
              newListGenres.push(temp.id);
            }
          } catch (error) {
            console.log(error);
          }
        })
      ).finally(() => {
        newArtist.albums = newListAlbums;
        newArtist.genres = newListGenres;

        Artist.findOne({ name: formatText(name) }).then(art => {
          if (art) {
            Artist.findOneAndUpdate(
              { _id: art.id },
              {
                $set: newArtist
              },
              { new: true }
            )
              .then(artist => res.json(artist))
              .catch(err => {
                errors.UpdateArtist = err;
                return errors;
              });
          } else {
            newArtist.name = name;
            new Artist(newArtist)
              .save()
              .then(artist => res.json(artist))
              .catch(err => {
                errors.CreateArtist = err;
                return errors;
              });
          }
        });
      });
    }
  }
);

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findById(req.user.id)
      .then(_user => {
        Artist.findById(req.params.id)
          .then(artist => {
            if (
              artist.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyLike: 'User already liked this post' });
            }
            artist.likes.unshift({ user: req.user.id });
            artist.save().then(__artist => res.json(__artist));
          })
          .catch(err => {
            res.status(404).json({ noPostFound: 'Not post found' });
          });
      })
      .catch(err => res.status(400).json({ UserErrors: 'USER not found' }));
  }
);
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findById(req.user.id)
      .then(_user => {
        Artist.findById(req.params.id)
          .then(artist => {
            if (
              artist.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notLike: 'You has not like this post yet.' });
            }
            const removeIndex = artist.likes
              .map(value => value.user.toString())
              .indexOf(req.params.id);
            // Remove out array likes
            artist.likes.splice(removeIndex, 1);
            artist.save().then(post => res.json(post));
          })
          .catch(err => {
            res.status(404).json({ noPostFound: 'Not post found.' });
          });
      })
      .catch(err => res.status(400).json({ UserErrors: 'USER not found' }));
  }
);

router.delete(
  '/delete/:artist_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Artist.findByIdAndRemove(req.params.artist_id)
      .then((haha, hihi) => res.json({ Success: true }))
      .catch(err => res.status(400).json(`Artist not found: ${err}`));
  }
);
module.exports = router;
