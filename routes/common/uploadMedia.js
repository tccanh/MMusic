const express = require('express');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

router.post('/media-upload', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(media =>
    cloudinary.uploader.upload(media.path, {
      resource_type: 'video',
      folder: 'media/music'
    })
  );
  Promise.all(promises)
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
});
module.exports = router;
