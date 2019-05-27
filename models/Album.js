const mongoose = require('mongoose');

const { Schema } = mongoose;
const AlbumSchema = new Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  release: {
    type: Date,
    default: Date.now()
  }
});
const Album = mongoose.model('albums', AlbumSchema);
module.exports = Album;
