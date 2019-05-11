import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Favorite } from '@material-ui/icons';
import { getGenre } from '../../../actions/genre.action';
import formatTime from '../../../apis/formatTime';
import collapeArtists from '../../../apis/collapeArtists';
class GenresDetail extends Component {
  static propTypes = {
    genre: PropTypes.object.isRequired,
    getGenre: PropTypes.func.isRequired
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
      <section className="row">
        <div className="album-tracks col-7">
          <ol>
            {tracks &&
              tracks.map((track, key) => {
                return (
                  <li key={key}>
                    <span>{track.name}</span>
                    <span>{collapeArtists(track.artists)}</span>
                    <span>{formatTime(track.duration)}</span>
                  </li>
                );
              })}
          </ol>
        </div>
        <div className="album-info col-5">
          <div className="album-art">
            {genre && <img src={genre.image} alt={genre.name} />}
            <div className="actions">
              <div className="play">Play</div>
              <div className="bookmark">
                <Favorite color="error" />
              </div>
            </div>
          </div>
          <div className="album-details">
            <h2>
              {genre.image && <img src={genre.image} alt={genre.name} />}
              {genre.name}
            </h2>
            <br />
            <br />
            <p>{genre.description}</p>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ genre: state.genre });

const mapDispatchToProps = { getGenre };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenresDetail);
