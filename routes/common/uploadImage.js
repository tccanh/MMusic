const express = require('express');
const cloudinary = require('cloudinary').v2;
const passport = require('passport');
const router = express.Router();

router.post(
  '/image-upload/:name/:size',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const where = req.params.name;
    const { size } = req.params;

    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path, {
        folder: `images/${where}`,
        // eslint-disable-next-line radix
        width: size ? parseInt(size) : 500,
        aspect_ratio: 1.1,
        gravity: 'face',
        crop: 'lfill'
      })
    );

    Promise.all(promises)
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
  }
);
module.exports = router;
