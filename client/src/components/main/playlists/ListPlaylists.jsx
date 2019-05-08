import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlaylistItem } from './PlaylistItem';

export default class ListPlaylists extends Component {
  render() {
    const { playlists } = this.props;
    return playlists.map(playlist => (
      <PlaylistItem key={playlist._id} playlist={playlist} />
    ));
  }
}

ListPlaylists.propTypes = {
  playlists: PropTypes.array.isRequired
};
