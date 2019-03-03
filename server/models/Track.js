const mongoose = require("mongoose");

const { Schema } = mongoose;
const TrackSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  image: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: "artists"
    }
  ],
  album: {
    type: Schema.Types.ObjectId,
    ref: "albums"
  },
  link: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  lyric: [
    {
      type: Schema.Types.ObjectId,
      ref: "lyrics"
    }
  ],
  genre: {
    type: Schema.Types.ObjectId,
    ref: "genres",
    required: true
  },
  country: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  public: {
    type: Boolean,
    required: true,
    default: false
  },
  create: {
    type: Date,
    default: Date.now()
  }
});
const Track = mongoose.model("tracks", TrackSchema);
module.exports = Track;
