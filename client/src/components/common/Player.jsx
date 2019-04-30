/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Player.css';
import {
  FastForward,
  FastRewind,
  PauseCircleOutline,
  PlayCircleOutline,
  VolumeDown,
  VolumeUp
} from '@material-ui/icons';
import formatTime from '../../api/formatTime';
class Player extends Component {
  constructor() {
    super();

    this.state = {
      is_playing: false,
      progress: 0,
      volume: 0.5,
      in_set_progress_mode: false
    };

    this.is_progress_dirty = false;
    this.interval_id = setInterval(this.onUpdate.bind(this), 250);
  }
  onUpdate() {
    if (this._player) {
      if (!this.is_progress_dirty) {
        this.setState({
          progress: this._player.currentTime / this._player.duration
        });
      }

      if (this._player.ended && this.props.onDone) {
        this.props.onDone(this.props.src);
      }
    }
  }
  toggleVolumePlus() {
    const currState = this.state.volume;
    if (currState >= 0.9) {
      this.setState({ volume: 1 });
    } else {
      this.setState({ volume: currState + 0.1 });
    }
  }
  toggleVolumeSub() {
    const currState = this.state.volume;
    if (currState <= 0.1) {
      this.setState({ volume: 0 });
    } else {
      this.setState({ volume: this.state.volume - 0.1 });
    }
  }
  toggleVolumeMute() {
    this.setState({ isMuted: !this.state.isMuted });
  }
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
        (evt.clientX - offsetLeft(this._progress_bar)) /
        this._progress_bar.clientWidth;
      this.setState({
        progress: progress
      });
      this.is_progress_dirty = true;
    }
  }
  render() {
    var currentTime = 0;
    var totalTime = 0;

    if (this._player) {
      if (
        this._player.currentSrc !== this.props.src &&
        this.props.src !== null
      ) {
        this._player.src = this.props.src;
      }

      if (this._player.paused && !this._player.ended) {
        if (this.state.is_playing) {
          this._player.play();
        }
      } else if (!this.state.is_playing) {
        this._player.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;

        this._player.currentTime = this._player.duration * this.state.progress;
      }
      this._player.volume = this.state.volume;
      currentTime = this._player.currentTime;
      totalTime = this._player.duration;
    }
    const btnPlayer = !this.state.is_playing ? (
      <PlayCircleOutline />
    ) : (
      <PauseCircleOutline />
    );
    const controlBtn = !!this.props.src ? (
      <div className="controls">
        <a onClick={this.props.onPrev}>
          <FastRewind />
        </a>
        <a onClick={this.togglePlay.bind(this)}>{btnPlayer}</a>
        <a onClick={this.props.onNext}>
          <FastForward />
        </a>
      </div>
    ) : (
      <div className="controls">
        <a>
          <FastRewind />
        </a>
        <a>{btnPlayer}</a>
        <a>
          <FastForward />
        </a>
      </div>
    );
    return (
      <div className="player">
        {controlBtn}
        <div
          onMouseDown={this.startSetProgress.bind(this)}
          onMouseMove={this.setProgress.bind(this)}
          onMouseLeave={this.stopSetProgress.bind(this)}
          onMouseUp={this.stopSetProgress.bind(this)}
          className="progress"
        >
          <div ref={ref => (this._progress_bar = ref)} className="bar">
            <div style={{ width: this.state.progress * 100 + '%' }} />
          </div>
        </div>
        <div className="volume">
          <VolumeDown onClick={() => this.toggleVolumeSub()} />
          <a href="">{Math.floor(this.state.volume * 100)} </a>
          <VolumeUp onClick={() => this.toggleVolumePlus()} />
        </div>
        <div className="time">
          {formatTime(currentTime)} / {formatTime(totalTime)}
        </div>
        <audio
          ref={ref => (this._player = ref)}
          autoPlay={this.state.is_playing}
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
