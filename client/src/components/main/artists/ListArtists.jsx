import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArtistItem } from './ArtistItem';
export default class ListArtists extends Component {
  render() {
    const { artists } = this.props;
    return artists.map(artist => (
      <ArtistItem key={artist._id} artist={artist} />
    ));
  }
}

ListArtists.propTypes = {
  artists: PropTypes.array.isRequired
};
