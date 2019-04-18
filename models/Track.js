const mongoose = require('mongoose');

const { Schema } = mongoose;
const TrackSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'genres',
    required: true
  },
  link: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  bit_rate: {
    type: String,
    required: true
  },
  bytes: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  released: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: true
  },
  artists: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: 'artists'
      },
      name: String
    }
  ],

  album: {
    type: Schema.Types.ObjectId,
    ref: 'albums'
  },

  lyric: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lyrics'
    }
  ],

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
  views: {
    type: Number,
    default: 0,
    required: true
  },
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

// TrackSchema.index({ '$**': 'text' });
TrackSchema.index(
  {
    name: 'text',
    'genres.name': 'text'
  },
  { weights: { name: 2, 'genres.name': 1 } }
);

// TrackSchema.pre('save', function() {
//   this.point =
//     this.views * 1 + this.likes.length * 2 + this.comments.length * 3;
// });

const Track = mongoose.model('tracks', TrackSchema);
module.exports = Track;
