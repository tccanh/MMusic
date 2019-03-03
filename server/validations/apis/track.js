/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");
const formatText = require("../formatText");

module.exports = function validateTrack(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : "";
  data.country = !isEmpty(data.country) ? formatText(data.country) : "";

  if (Validator.isEmpty(data.name)) {
    errors.track = "Track name field is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.track = "Track name is at least 3 characters";
  }
  if (Validator.isEmpty(data.country)) {
    errors.track = "Country field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
