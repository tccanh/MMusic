const mongoose = require("mongoose");

const { Schema } = mongoose;
const ArtistSchema = new Schema({
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
const Artist = mongoose.model("artists", ArtistSchema);
module.exports = Artist;
