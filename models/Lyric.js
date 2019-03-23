const mongoose = require('mongoose');

const { Schema } = mongoose;
const LyricSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  language: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true,
    default: false
  }
});
const Lyric = mongoose.model('lyrics', LyricSchema);
module.exports = Lyric;
