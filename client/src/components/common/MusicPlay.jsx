/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import { PlayArrow, Pause } from '@material-ui/icons';
export default class MusicPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true
    };
    const { link } = this.props;
    this.audio = new Audio(link);
  }

  play = () => {
    this.setState({ play: true, pause: false });
    this.audio.play();
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    this.audio.pause();
  };
  render() {
    const PlayButton = this.state.play ? (
      <Pause onClick={this.pause} style={{ fontSize: '40px' }} />
    ) : (
      <PlayArrow onClick={this.play} style={{ fontSize: '40px' }} />
    );
    const { image, artists, title, duration } = this.props;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);
    return (
      <div>
        <div className="card">
          <div className="view">
            <img className="card-img-top" src={image} alt="Card image cap" />
            <a href="/" target="_blank">
              <div className="mask gradient-card" />
            </a>
          </div>

          <div className="card-body text-center">
            <h5 className="h5 font-weight-bold">
              <a href="/" target="_blank">
                {title}
              </a>
            </h5>
            <p className="mb-0">{artists}</p>
            <div id="audioplayer">
              <i id="pButton">{PlayButton}</i>
              <div id="timeline">
                <div id="playhead" />
              </div>
              <div className="duration">
                <p>{`${minutes}: ${seconds}`}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={this.pause}>Pause</button> */}
      </div>
    );
  }
}
