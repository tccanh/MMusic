import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListPlaylists from './ListPlaylists';
import Spinner from '../common/Spinner';
import { getPlaylists } from '../../actions/playlist.action';
import CreatePlaylist from './CreatePlaylist';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.props.getPlaylists(); // cập nhật lúc đầu
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
        <h1 className="text-center title">Playlist</h1>
        <div>
          <Fab
            color="secondary"
            size="small"
            aria-label="Add"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
          <CreatePlaylist
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
        <br />
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
