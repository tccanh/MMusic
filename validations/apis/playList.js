/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../is-empty');
const formatText = require('../formatText');

module.exports = function validatePlayList(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : '';
  data.description = !isEmpty(data.description) ? data.description.trim() : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'PlayList name field is required';
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'PlayList name is at least 3 characters';
  }

  if (
    !Validator.isEmpty(data.description) &&
    !Validator.isLength(data.description, { min: 10, max: 500 })
  ) {
    errors.description =
      'Please describe more carefully this artist let us know...';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
