import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlbumItem } from './AlbumItem';

export default class ListAlbums extends Component {
  render() {
    const { albums } = this.props;
    return albums.map(album => <AlbumItem key={album._id} album={album} />);
  }
}

ListAlbums.propTypes = {
  albums: PropTypes.array.isRequired
};
