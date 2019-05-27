/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../is-empty');
const formatText = require('../formatText');

module.exports = function validateArtist(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : '';
  data.description = !isEmpty(data.description) ? data.description.trim() : '';
  data.genres = !isEmpty(data.genres) ? data.genres.trim() : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Artist name field is required...';
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'Artist name is at least 3 characters...';
  }
  if (
    !Validator.isEmpty(data.description) &&
    !Validator.isLength(data.description, { min: 10, max: 500 })
  ) {
    errors.description =
      'Please describe more carefully this artist let us know...';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image is required';
  } else if (!Validator.isURL(data.image)) {
    errors.image = 'Image link invalid';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
