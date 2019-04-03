import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class PlaylistItem extends Component {
  static propTypes = {
    playlist: PropTypes.object.isRequired
  };

  render() {
    const { playlist } = this.props;
    const isPublic = playlist.publics ? (
      <p className="text-center text-danger">Public</p>
    ) : (
      <p className="text-center text-danger">Private</p>
    );
    return (
      <div class="col-md-2">
        <img
          className=" img-thumbnail img-fluid"
          src={playlist.image}
          alt={playlist.name}
        />
        {isPublic}
        <h5 className="text-center">{playlist.name}</h5>
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
)(PlaylistItem);
