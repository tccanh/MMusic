import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GenreItem } from './GenreItem';

export default class ListGenres extends Component {
  render() {
    const { genres } = this.props;
    return genres.map(genre => <GenreItem key={genre._id} genre={genre} />);
  }
}

ListGenres.propTypes = {
  genres: PropTypes.array.isRequired
};
