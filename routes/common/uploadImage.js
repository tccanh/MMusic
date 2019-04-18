const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

router.post('/image-upload/:name', (req, res) => {
  const where = req.params.name;
  console.log(where);

  const values = Object.values(req.files);
  const promises = values.map(image =>
    cloudinary.uploader.upload(image.path, {
      folder: `images/${where}`,
      width: 500,
      aspect_ratio: 1.1,
      crop: 'lfill'
    })
  );

  Promise.all(promises)
    .then(results => {
      // console.log('Promise: UPLOAD', results);

      return res.json(results);
    })
    .catch(err => res.status(400).json(err));
});
module.exports = router;
