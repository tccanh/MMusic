/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN", "MOD", "GUESS"],
    required: true
  }
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
