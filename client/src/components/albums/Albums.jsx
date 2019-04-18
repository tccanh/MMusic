import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListAlbums from './ListAlbums';
import { Link } from 'react-router-dom';
import { getAlbums } from '../../actions/album.action';
import Spinner from '../common/Spinner';
class Albums extends Component {
  componentDidMount() {
    this.props.getAlbums(); // cập nhật lúc đầu
  }

  render() {
    const { albums, loading } = this.props.album;
    let AlbumsContent;
    if (albums === null || loading) {
      AlbumsContent = <Spinner />;
    } else {
      AlbumsContent = <ListAlbums albums={albums} />;
    }
    return (
      <div className="container">
        <h1 className="text-center title">
          Albums <Link to="/create-album"> New</Link>
        </h1>
        <div className="row">{AlbumsContent}</div>
      </div>
    );
  }
}

Albums.propTypes = {
  getAlbums: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  album: state.album
});

const mapDispatchToProps = {
  getAlbums
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);
