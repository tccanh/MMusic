import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlbum } from '../../../actions/album.action';
import { addSongs, playSong } from '../../../actions/song.action';
import formatTime from '../../../apis/formatTime';
import { leftDate } from '../../../apis/formatDate';
import collapeArtists from '../../../apis/collapeArtists';
import { PlayArrow } from '@material-ui/icons';
class AlbumDetail extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired,
    getAlbum: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      album: {},
      tracks: []
    };
  }

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id);
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.album.album &&
      Object.entries(newProps.album.album).length > 0
    ) {
      this.setState({
        tracks: newProps.album.album.tracks,
        album: newProps.album.album.album
      });
    }
  }
  render() {
    const { album, tracks } = this.state;

    return (
      <>
        <h1 className="title-section">{album.name}</h1>
        <section className="row">
          <div className="album-tracks col-7">
            <ol>
              {tracks &&
                tracks.map((track, key) => {
                  return (
                    <li key={key}>
                      <span onClick={() => this.props.playSong(track)}>
                        {track.name}
                        <p
                          style={{
                            display: 'inline',
                            fontStyle: 'italic',
                            fontWeight: 500
                          }}
                        >
                          ({collapeArtists(track.artists)})
                        </p>
                        <PlayArrow fontSize="small" />
                      </span>
                      <span>{formatTime(track.duration)}</span>
                    </li>
                  );
                })}
            </ol>
          </div>
          <div className="album-info col-5">
            <div className="album-art">
              {album && <img src={album.image} alt={album.name} />}
              <br />
              <br />
              <div className="actions">
                <div
                  onClick={() => this.props.addSongs(tracks)}
                  className="play"
                >
                  Play All
                </div>
              </div>
            </div>
            <div className="album-details" style={{ marginTop: '-25px' }}>
              <h3 style={{ fontSize: 'large' }}>
                Release: {leftDate(album.release)}
              </h3>
              <h3 style={{ fontSize: 'large' }}>Description:</h3>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({ album: state.album });

const mapDispatchToProps = { getAlbum, addSongs, playSong };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumDetail);
