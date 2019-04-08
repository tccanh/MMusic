import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../common/Spinner';
import { getTracks } from '../../actions/track.action';
import ListTrack from './ListTrack';
export class Charts extends Component {
  static propTypes = {
    getTracks: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getTracks(); // cập nhật lúc đầu
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
        <h1 className="text-center title">Charts</h1>
        {TrackContent}
      </>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track
});

const mapDispatchToProps = {
  getTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charts);
