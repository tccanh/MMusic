import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ArtistItem extends Component {
  static propTypes = {
    artist: PropTypes.object.isRequired
  };

  render() {
    const { artist } = this.props;
    return (
      <div class="col-md-2">
        <img
          className=" img-thumbnail img-fluid"
          src={artist.image}
          alt={artist.name}
        />
        <h5 className="text-center title">{artist.name}</h5>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistItem);
