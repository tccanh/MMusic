/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../is-empty');
const PasswordError = require('./password');

module.exports = function validateRegister(data) {
  const { errors, isValid } = PasswordError(data);

  data.name = !isEmpty(data.name) ? data.name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  } else if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.username = 'username must be between 5 and 30 characters';
  }
  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  return {
    errors,
    isValid: isEmpty(errors) || isValid
  };
};
