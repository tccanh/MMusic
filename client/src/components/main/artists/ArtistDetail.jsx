import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtist } from '../../../actions/artist.action';
import { addSongs, playSong } from '../../../actions/song.action';
import formatTime from '../../../apis/formatTime';
import { PlayArrow } from '@material-ui/icons';
class GenresDetail extends Component {
  static propTypes = {
    artist: PropTypes.object.isRequired,
    getArtist: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      tracks: []
    };
  }

  componentDidMount() {
    this.props.getArtist(this.props.match.params.id);
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.artist.artist &&
      Object.entries(newProps.artist.artist).length > 0
    ) {
      this.setState({
        tracks: newProps.artist.artist.tracks,
        artist: newProps.artist.artist.artist
      });
    }
  }
  render() {
    const { artist, tracks } = this.state;

    return (
      <>
        <h1 className="title-section">{artist.name}</h1>
        <section className="row">
          <div className="album-tracks col-7">
            <ol>
              {tracks &&
                tracks.map((track, key) => {
                  return (
                    <li key={key}>
                      <span onClick={() => this.props.playSong(track)}>
                        {track.name}
                        <PlayArrow fontSize="small" />
                      </span>
                      {track.album && <span>{track.album.name}</span>}
                      <span>{formatTime(track.duration)}</span>
                    </li>
                  );
                })}
            </ol>
          </div>
          <div className="album-info col-5">
            <div className="album-art">
              {artist && <img src={artist.image} alt={artist.name} />}
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
            <div
              className="album-details"
              style={{ marginTop: '-25px', fontStyle: 'italic' }}
            >
              <h3 style={{ fontSize: 'x-large' }}>Description:</h3>
              <p style={{ marginTop: '-25px' }}>{artist.description}</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({ artist: state.artist });

const mapDispatchToProps = { getArtist, addSongs, playSong };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenresDetail);
