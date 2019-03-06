/* eslint-disable no-param-reassign */
const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.username = "User is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
