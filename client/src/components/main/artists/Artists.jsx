import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListArtists from './ListArtists';
import { Link } from 'react-router-dom';
import { getArtists } from '../../../actions/artist.action';
import Spinner from '../../common/Spinner/Spinner';
class Artists extends Component {
  componentDidMount() {
    this.props.getArtists(); // cập nhật lúc đầu
  }

  render() {
    const { artists, loading } = this.props.artist;
    let ArtistsContent;
    if (artists === null || loading) {
      ArtistsContent = <Spinner />;
    } else {
      ArtistsContent = <ListArtists artists={artists} />;
    }
    return (
      <div className="container">
        <h1 className="text-center title">
          Artists <Link to="create-artist">New</Link>
        </h1>
        <div className="row">{ArtistsContent}</div>
      </div>
    );
  }
}

Artists.propTypes = {
  getArtists: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  artist: state.artist
});

const mapDispatchToProps = {
  getArtists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Artists);
