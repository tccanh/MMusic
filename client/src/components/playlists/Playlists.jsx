import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListPlaylists from './ListPlaylists';
import Spinner from '../common/Spinner';
import { getPlaylists } from '../../actions/playlist.action';
import CreatePlaylist from './CreatePlaylist';
class Playlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showADD: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    this.setState({ showADD: false });
    this.props.getPlaylists(); // cập nhật lúc đầu
  }
  handleOnClick() {
    this.setState({ showADD: !this.state.showADD });
  }
  render() {
    const { playlists, loading } = this.props.playlist;
    let PlaylistsContent;
    if (playlists === null || loading) {
      PlaylistsContent = <Spinner />;
    } else {
      PlaylistsContent = <ListPlaylists playlists={playlists} />;
    }
    const { showADD } = this.state;
    let AddPlaylistContent;
    if (showADD) {
      AddPlaylistContent = (
        <>
          <button
            className="btn btn-danger btn-fab btn-round"
            onClick={this.handleOnClick}
          >
            <i className="material-icons">remove</i>
          </button>
          <CreatePlaylist />;
        </>
      );
    } else {
      AddPlaylistContent = (
        <button
          className="btn btn-danger btn-fab btn-round"
          onClick={this.handleOnClick}
          style={{ margin: '15px' }}
        >
          <i className="material-icons">add</i>
        </button>
      );
    }

    return (
      <div className="container">
        <h1 className="text-center title">Playlists</h1>
        <div>{AddPlaylistContent}</div>
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
