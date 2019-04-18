/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../is-empty');
const formatText = require('../formatText');

module.exports = function validateTrack(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? formatText(data.name) : '';
  data.artists = !isEmpty(data.artists) ? formatText(data.artists) : '';
  data.country = !isEmpty(data.country) ? formatText(data.country) : '';
  data.authors = !isEmpty(data.authors) ? formatText(data.authors) : 'Unknown';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Trackname field is required';
  } else if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = 'Trackname is at least 3 characters';
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }
  if (Validator.isEmpty(data.artists)) {
    errors.artists = 'Artists field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
