/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
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
