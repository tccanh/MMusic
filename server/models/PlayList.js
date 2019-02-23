const mongoose = require("mongoose");

const { Schema } = mongoose;
const PlayListSchema = new Schema({
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
  public: {
    type: Boolean,
    required: true,
    default: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tracks"
    }
  ],
  update: {
    type: Date,
    default: Date.now()
  },
  description: {
    type: String
  }
});
const PlayList = mongoose.model("playlists", PlayListSchema);
module.exports = PlayList;
