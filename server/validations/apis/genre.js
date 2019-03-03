/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateGenre(data) {
  const errors = {};
  data.genre = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.genre = "Genre name field is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.genre = "Genre name is at least 3 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
