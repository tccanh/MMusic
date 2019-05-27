import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGenre } from '../../../actions/genre.action';
import { addSongs, playSong } from '../../../actions/song.action';
import formatTime from '../../../apis/formatTime';
import collapeArtists from '../../../apis/collapeArtists';
import { PlayArrow } from '@material-ui/icons';
class GenresDetail extends Component {
  static propTypes = {
    genre: PropTypes.object.isRequired,
    getGenre: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      genre: {},
      tracks: []
    };
  }

  componentDidMount() {
    this.props.getGenre(this.props.match.params.name);
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.genre.genre &&
      Object.entries(newProps.genre.genre).length > 0
    ) {
      this.setState({
        tracks: newProps.genre.genre.tracks,
        genre: newProps.genre.genre.genre
      });
    }
  }
  render() {
    const { genre, tracks } = this.state;

    return (
      <>
        <h1 className="title-section">{genre.name}</h1>
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
              {genre && <img src={genre.image} alt={genre.name} />}
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
              <p style={{ marginTop: '-25px' }}>{genre.description}</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({ genre: state.genre });

const mapDispatchToProps = { getGenre, addSongs, playSong };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenresDetail);
