/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: String,
  password: String,
  avatar: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other"
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN", "MOD"],
    required: true
  },
  googleID: String,
  facebookID: String
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
