/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../../actions/track.action';
import { addSongs, playSong } from '../../../actions/song.action';
import ListTrack from './ListTrack';
import { Button } from '@material-ui/core';
import Circular from '../../common/Progress/Circular';
class Tracks extends Component {
  static propTypes = {
    getTracks: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getTracks(); // cập nhật lúc đầu
  }
  toggleListenAll(tracks) {
    this.props.addSongs(tracks);
  }
  render() {
    let TrackContent;
    const { tracks, loading } = this.props.track;
    if (tracks === null || loading) {
      TrackContent = <Circular />;
    } else {
      TrackContent = (
        <ListTrack tracks={tracks} playSong={this.props.playSong} />
      );
    }
    return (
      <div className="container">
        <h1
          className="text-center title"
          style={{ fontSize: 60, fontFamily: 'monospace', fontWeight: 'bold' }}
        >
          CHART
        </h1>
        <a
          onClick={() => this.toggleListenAll(tracks)}
          className="btn btn-danger"
          style={{ color: 'white', marginLeft: 15 }}
        >
          LISTEN ALL
        </a>
        {TrackContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track,
  song: state.song
});

const mapDispatchToProps = {
  getTracks,
  playSong,
  addSongs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
