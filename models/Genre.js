const mongoose = require('mongoose');

const { Schema } = mongoose;
const GenreSchema = new Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});
const Genre = mongoose.model('genres', GenreSchema);
module.exports = Genre;
