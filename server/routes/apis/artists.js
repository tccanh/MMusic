/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require("express").Router();
const cloudinary = require("cloudinary");
const multer = require("multer");
const Artist = require("../../models/Artist");
const Album = require("../../models/Album");
const User = require("../../models/User");
const { fileFilter, storage } = require("../../configs/uploadImage");
const formatText = require("../../validations/formatText");
const isEmpty = require("../../validations/is-empty");

const upload = multer({ storage, fileFilter });
const validateArtist = require("../../validations/apis/artist");
// Get list artist
router.get("/", (req, res, next) => {
  Artist.find()
    .sort({ date: -1 })
    .then(artist => res.json(artist))
    .catch(err =>
      res.status(404).json({ noartistFounds: `No artists found: ${err}` })
    );
});

// Post create or update image
router.post("/", upload.single("image"), async (req, res, next) => {
  const { errors, isValid } = validateArtist(req.body);
  const { name, genres, description, albums } = req.body;
  const newArtist = {};
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if (description) newArtist.description = description;
  try {
    await cloudinary.uploader.upload(req.file.path, _res => {
      newArtist.image = _res.secure_url;
    });
  } catch (error) {
    res.status(400).json({ ErrorUploadImage: error });
  }

  if (albums) {
    const listAlbums = albums.split(",").map(album => formatText(album));
    newArtist.albums = [];
    const AlbumIDs = await listAlbums.map(_alb => {
      Album.findOne({ name: _alb })
        .then(__alb => {
          console.log("hello: ", __alb);
          if (!isEmpty(__alb)) {
            newArtist.albums.unshift({
              id: __alb.id,
              name: __alb.name
            });
          }
        })
        .catch(err => {
          errors.Albums = `Album ${_alb} not found: ${err}`;
          return res.status(400).json(errors);
        });
    });
  }
  if (genres) {
    const listGenres = genres.split(",").map(genr => formatText(genr));
    newArtist.genres = listGenres;
  }

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

router.post("/like/:id", (req, res, next) => {
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
              .json({ alreadyLike: "User already liked this post" });
          }
          artist.likes.unshift({ user: req.user.id });
          artist.save().then(__artist => res.json(__artist));
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
      Artist.findById(req.params.id)
        .then(artist => {
          if (
            artist.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLike: "You has not like this post yet." });
          }
          const removeIndex = artist.likes
            .map(value => value.user.toString())
            .indexOf(req.params.id);
          // Remove out array likes
          artist.likes.splice(removeIndex, 1);
          artist.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found." });
        });
    })
    .catch(err => res.status(400).json({ UserErrors: "USER not found" }));
});

router.delete("/delete/:artist_id", (req, res, next) => {
  Artist.findByIdAndRemove(req.params.artist_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Artist not found: ${err}`));
});
module.exports = router;
