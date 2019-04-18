/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../is-empty');
const formatText = require('../formatText');

module.exports = function validateGenre(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : '';
  data.image = !isEmpty(data.image) ? formatText(data.image) : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Genre name field is required';
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'Genre name is at least 3 characters';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image is required';
  } else if (!Validator.isURL(data.image)) {
    errors.image = 'Image invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
