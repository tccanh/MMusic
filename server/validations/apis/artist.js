/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");
const formatText = require("../formatText");

module.exports = function validateArtist(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : "";
  data.description = !isEmpty(data.description) ? data.description.trim() : "";
  data.genres = !isEmpty(data.genres) ? data.genres.trim() : "";

  if (Validator.isEmpty(data.name)) {
    errors.artist = "Artist name field is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.artist = "Artist name is at least 3 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
