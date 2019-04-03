/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const Album = require('../../models/Album');
const { fileFilter, storage } = require('../../configs/uploadImage');

const upload = multer({ storage, fileFilter });
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
router.post('/', upload.single('image'), async (req, res, next) => {
  const { errors, isValid } = validateAlbum(req.body);
  const { name } = req.body;
  const newAlbum = {};
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
        folder: 'images/albums',
        width: 500,
        aspect_ratio: 1.1,
        crop: 'lfill'
      })
      .then(res_ => (newAlbum.image = res_.secure_url));
  } catch (error) {
    errors.FileUpload = 'Error Upload Image';
    return res.status(400).json(errors);
  }

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
      if (req.body.name) newAlbum.name = req.body.name;
      new Album(newAlbum)
        .save()
        .then(_album => res.json(_album))
        .catch(err => res.json({ CreateAlbumERROR: err }));
    }
  });
});

router.delete('/delete/:album_id', (req, res, next) => {
  Album.findByIdAndRemove(req.params.album_id)
    .then((haha, hihi) => res.json({ Success: true }))
    .catch(err => res.status(400).json(`Album not found: ${err}`));
});
module.exports = router;
