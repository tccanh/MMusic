/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");
const formatText = require("../formatText");

module.exports = function validateProfile(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : "";
  data.username = !isEmpty(data.username) ? data.username.trim() : "";
  data.email = !isEmpty(data.email) ? data.email.trim() : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "Other";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.username = "User is invalid";
  }

  if (!Validator.isEmail(data.email) && !isEmpty(data.email)) {
    errors.email = "Email invalid.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
