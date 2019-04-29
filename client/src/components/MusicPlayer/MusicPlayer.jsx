import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrack } from '../../actions/track.action';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import MusicPlay from '../common/MusicPlay';
class MusicPlayer extends Component {
  componentDidMount() {
    this.props.getTrack(this.props.match.params.id);
  }

  render() {
    const { track, loading } = this.props.track;

    // const listArtists = track.artists.map(value => value.name).join(', ');

    let tracksContent;
    if (track === null || Object.keys(track).length === 0 || loading) {
      tracksContent = <Spinner />;
    } else {
      const listArtists = track.artists.map(val => val.name).join(', ');
      tracksContent = (
        <MusicPlay
          link={track.link}
          image={track.image}
          title={track.name}
          artists={listArtists}
          duration={track.duration}
        />
      );
    }
    return (
      <div className="container">
        <h1 className="text-center title">
          tracks <Link to="/create-track"> New</Link>
        </h1>
        <div className="row">{tracksContent}</div>
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  getTrack: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  track: state.track
});

const mapDispatchToProps = {
  getTrack
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer);
