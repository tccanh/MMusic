/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateAlbum(data) {
  const errors = {};
  data.album = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.album = "Album name field is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.album = "Album name is at least 3 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};