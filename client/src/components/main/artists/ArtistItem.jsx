import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class ArtistItem extends Component {
  static propTypes = {
    artist: PropTypes.object.isRequired
  };

  render() {
    const { artist } = this.props;
    return (
      <Link className="col-md-2" to={`/artist/${artist._id}`}>
        <img
          className=" img-thumbnail img-fluid"
          src={artist.image}
          alt={artist.name}
        />
        <h5 className="text-center title">{artist.name}</h5>
      </Link>
    );
  }
}
