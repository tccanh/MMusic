const express = require('express');
const cloudinary = require('cloudinary');
const router = express.Router();

router.post('/image-upload', (req, res) => {
  const values = Object.values(req.files);
  console.log(req.files);

  // const promises = values.map(image => cloudinary.uploader.upload(image.path));
  const promises = values.map(image =>
    cloudinary.uploader.upload(image.path, {
      folder: 'images/hahaha',
      width: 500,
      aspect_ratio: 1.1,
      crop: 'lfill'
    })
  );

  Promise.all(promises)
    .then(results => {
      console.log('Promise: UPLOAD', results);

      return res.json(results);
    })
    .catch(err => res.status(400).json(err));
});
module.exports = router;
