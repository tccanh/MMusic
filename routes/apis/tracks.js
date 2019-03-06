/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require("express").Router();
const cloudinary = require("cloudinary");
const multer = require("multer");
const Track = require("../../models/Track");
const Artist = require("../../models/Artist");
const User = require("../../models/User");
const Album = require("../../models/Album");
const Genre = require("../../models/Genre");
const { fileFilter, storage } = require("../../configs/uploadImage");
const formatText = require("../../validations/formatText");
const isEmpty = require("../../validations/is-empty");

const upload = multer({ storage, fileFilter });
const validateTrack = require("../../validations/apis/track");
// Get list track
router.get("/", (req, res, next) => {
  Track.find()
    .sort({ date: -1 })
    .then(track => res.json(track))
    .catch(err =>
      res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
    );
});

// Track create or update image
router.post("/", upload.single("image"), async (req, res, next) => {
  const { errors, isValid } = validateTrack(req.body);
  const { name, artists, album, duration, genre, country } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTrack = {};
  newTrack.owner = req.user.id;
  if (name) newTrack.name = name;
  await cloudinary.uploader.upload(req.file.path, _res => {
    newTrack.image = _res.secure_url;
  });
  if (artists) {
    const listArtists = artists.split(",").map(arts => formatText(arts));
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
  //   if (link) {
  //     newTrack.link = link;
  //   }
  //   if (lyric) {
  //     newTrack.lyric = lyric;
  //   }
  if (duration) newTrack.duration = duration;
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
  if (country) newTrack.country = country;
  new Track(newTrack)
    .save()
    .then(__track => res.json(__track))
    .catch(err => {
      errors.genre = `Genre ${genre} not found`;
      return res.status(400).json(errors);
    });
});

router.delete("/delete/:track_id", (req, res, next) => {
  Track.findByIdAndRemove(req.params.track_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Track not found: ${err}`));
});

router.post("/comment/:id", (req, res, next) => {
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
    .catch(err => res.json({ noTrackFound: "Not post found." }));
});
router.delete("/comment/:id/:cmt_id", (req, res, next) => {
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
              .json({ commentNotExist: "Comment is not exists" });
          }
          // Get remove
          const removeIndex = track.comments
            .map(cmt => cmt.id.toString())
            .indexOf(req.params.cmt_id);
          track.comments.splice(removeIndex, 1);
          track.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found." });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: "USER not found" }));
});

router.post("/like/:id", (req, res, next) => {
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
              .json({ alreadyLike: "User already liked this post" });
          }
          track.likes.unshift({ user: req.user.id });
          track.save().then(__track => res.json(__track));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found" });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: "USER not found" }));
});
router.post("/unlike/:id", (req, res, next) => {
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
              .json({ notLike: "You has not like this post yet." });
          }
          const removeIndex = track.likes
            .map(value => value.user.toString())
            .indexOf(req.params.id);
          // Remove out array likes
          track.likes.splice(removeIndex, 1);
          track.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found." });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: "USER not found" }));
});

router.delete("/delete/:track_id", (req, res, next) => {
  Track.findByIdAndRemove(req.params.track_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Track not found: ${err}`));
});
module.exports = router;
