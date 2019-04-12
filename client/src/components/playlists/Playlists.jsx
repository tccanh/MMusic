import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListPlaylists from './ListPlaylists';
import Spinner from '../common/Spinner';
import { getPlaylists } from '../../actions/playlist.action';
class Playlists extends Component {
  componentDidMount() {
    this.props.getPlaylists(); // cập nhật lúc đầu
  }

  render() {
    const { playlists, loading } = this.props.playlist;
    let PlaylistsContent;
    if (playlists === null || loading) {
      PlaylistsContent = <Spinner />;
    } else {
      PlaylistsContent = <ListPlaylists playlists={playlists} />;
    }
    return (
      <div className="container">
        <h1 className="text-center title">Playlists</h1>
        <div className="row">{PlaylistsContent}</div>
      </div>
    );
  }
}

Playlists.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  playlist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  playlist: state.playlist
});

const mapDispatchToProps = {
  getPlaylists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
