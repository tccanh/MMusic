import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export class AlbumItem extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired
  };

  render() {
    const { album } = this.props;
    return (
      <Link className="col-md-2" to={`/album/${album._id}`}>
        <img
          className=" img-thumbnail img-fluid"
          src={album.image}
          alt={album.name}
        />
        <h5 className="text-center title">{album.name}</h5>
      </Link>
    );
  }
}
