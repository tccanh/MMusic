import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AlbumItem extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired
  };

  render() {
    const { album } = this.props;
    return (
      <div className="col-md-2">
        <img
          className=" img-thumbnail img-fluid"
          src={album.image}
          alt={album.name}
        />
        <h5 className="text-center title">{album.name}</h5>
      </div>
    );
  }
}
