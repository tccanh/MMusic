/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Player.css';
import {
  FastForward,
  FastRewind,
  PauseCircleOutline,
  PlayCircleOutline
} from '@material-ui/icons';
import formatTime from '../../../apis/formatTime';
import Volume from './Volume';
class Player extends Component {
  constructor() {
    super();
    this._progress_bar = React.createRef();
    this._player = React.createRef();

    this.state = {
      is_playing: false,
      progress: 0,
      volume: 0.5,
      in_set_progress_mode: false
    };

    this.is_progress_dirty = false;
  }
  componentWillReceiveProps() {
    this.interval_id = setInterval(this.onUpdate.bind(this), 250);
  }
  onUpdate() {
    if (this._player.current) {
      if (!this.is_progress_dirty) {
        this.setState({
          progress:
            this._player.current.currentTime / this._player.current.duration
        });
      }
    }
  }
  // VOLUME
  increaseVolume() {
    const currState = this.state.volume;
    if (currState >= 0.9) {
      this.setState({ volume: 1 });
    } else {
      this.setState({ volume: currState + 0.1 });
    }
  }
  decreaseVolume() {
    const currState = this.state.volume;
    if (currState <= 0.1) {
      this.setState({ volume: 0 });
    } else {
      this.setState({ volume: currState - 0.1 });
    }
  }
  // PLAY
  togglePlay() {
    this.setState({ is_playing: !this.state.is_playing });
  }

  startSetProgress(evt) {
    this.setState({
      in_set_progress_mode: true
    });
    this.setProgress(evt);
  }
  stopSetProgress(evt) {
    this.setState({
      in_set_progress_mode: false
    });
    this.setProgress(evt);
  }
  setProgress(evt) {
    if (this.state.in_set_progress_mode) {
      var progress =
        (evt.clientX - offsetLeft(this._progress_bar.current)) /
        this._progress_bar.current.clientWidth;
      this.setState({
        progress: progress
      });
      this.is_progress_dirty = true;
    }
  }
  render() {
    var currentTime = 0;
    var totalTime = 0;
    const { volume } = this.state;

    if (this._player.current) {
      if (
        this._player.current.currentSrc !== this.props.src &&
        this.props.src !== null
      ) {
        this._player.current.src = this.props.src;
      }

      if (this._player.current.paused && !this._player.current.ended) {
        if (this.state.is_playing) {
          this._player.current.play();
        }
      } else if (!this.state.is_playing) {
        this._player.current.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;

        this._player.current.currentTime =
          this._player.current.duration * this.state.progress;
      }
      this._player.current.volume = this.state.volume;
      currentTime = this._player.current.currentTime;
      totalTime = this._player.current.duration;
    }
    const btnPlayer = !this.state.is_playing ? (
      <PlayCircleOutline
        className="songicon"
        style={{ fontSize: 'xx-large' }}
      />
    ) : (
      <PauseCircleOutline
        className="songicon"
        style={{ fontSize: 'xx-large' }}
      />
    );
    return (
      <div className="player">
        <div className="controls">
          <div className="childs">
            <a onClick={this.props.onPrev}>
              <FastRewind
                className="songicon"
                style={{ fontSize: 'xx-large' }}
              />
            </a>
            <a onClick={this.togglePlay.bind(this)}>{btnPlayer}</a>
            <a onClick={this.props.onNext}>
              <FastForward
                className="songicon"
                style={{ fontSize: 'xx-large' }}
              />
            </a>
          </div>
        </div>
        <div className="time1">{formatTime(currentTime)}</div>
        <div
          onMouseDown={this.startSetProgress.bind(this)}
          onMouseMove={this.setProgress.bind(this)}
          onMouseLeave={this.stopSetProgress.bind(this)}
          onMouseUp={this.stopSetProgress.bind(this)}
          className="progress"
        >
          <div ref={this._progress_bar} className="bar">
            <div style={{ width: this.state.progress * 100 + '%' }} />
          </div>
        </div>
        <div className="time2">{formatTime(totalTime)}</div>
        <Volume
          volume={volume}
          increaseVolume={this.increaseVolume.bind(this)}
          decreaseVolume={this.decreaseVolume.bind(this)}
        />
        <audio
          ref={this._player}
          autoPlay={this.state.is_playing}
          onEnded={() => this.props.onDone()}
        >
          <source src={this.props.src} />
          <source />
        </audio>
      </div>
    );
  }
}

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

export default Player;
