/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
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
