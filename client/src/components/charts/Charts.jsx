import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../actions/track.action';
import { addSongs } from '../../actions/song.action';
import ListTrack from './ListTrack';
import Spinner from '../common/Spinner';
import { Button } from '@material-ui/core';
export class Charts extends Component {
  static propTypes = {
    getTracks: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
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
      TrackContent = <Spinner />;
    } else {
      TrackContent = <ListTrack tracks={tracks} />;
    }
    return (
      <>
        <Button onClick={() => this.toggleListenAll(tracks)}>Listen</Button>
        <h1 className="text-center title">Charts</h1>
        {TrackContent}
      </>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track,
  song: state.song
});

const mapDispatchToProps = {
  getTracks,
  addSongs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charts);
