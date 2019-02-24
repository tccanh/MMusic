/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN", "MOD", "GUESS"],
    required: true
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});
const User = mongoose.model("users", UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    // eslint-disable-next-line no-shadow
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      // eslint-disable-next-line no-param-reassign
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  const query = { username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
module.exports = User;
