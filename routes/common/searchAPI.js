const express = require('express');

const router = express.Router();
const Track = require('../../models/Track');

router.get('/', (req, res) => {
  const searchString = req.query.text;
  console.log(searchString);

  Track.find(
    { $text: { $search: searchString } },
    { score: { $meta: 'textScore' } }
  )
    .sort({
      score: { $meta: 'textScore' }
    })
    .then(track => res.json(track))
    .catch(err =>
      res.status(404).json({ notrackFounds: `No tracks found: ${err}` })
    );
});
module.exports = router;
