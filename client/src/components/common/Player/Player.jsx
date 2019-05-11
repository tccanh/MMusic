/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    //console.log('OUT:', this.interval);
    if (this.interval) {
      //console.log('Clear', this.interval);
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(this.onUpdate.bind(this), 250);
      //console.log('Create:', this.interval);
    }
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
      this.setState(pre => ({ volume: currState + 0.1 }));
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
    this.setState(pre => ({ is_playing: !pre.is_playing }));
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
    const { volume, is_playing, progress } = this.state;
    const { loop, src, onPrev, onNext, onDone } = this.props;
    if (this._player.current) {
      if (this._player.current.currentSrc !== src && src !== null) {
        this._player.current.src = src;
        this._player.current.load();
      }

      if (this._player.current.paused && !this._player.current.ended) {
        if (is_playing) {
          // this._player.current.load();
          //Đặt onload ở đây là chết
          this._player.current.play();
        }
      } else if (!is_playing) {
        this._player.current.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;

        this._player.current.currentTime =
          this._player.current.duration * progress;
      }
      this._player.current.volume = volume;
      this._player.current.loop = loop;
      currentTime = this._player.current.currentTime;
      totalTime = this._player.current.duration;
    }
    const btnPlayer = !is_playing ? (
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
            <a onClick={onPrev}>
              <FastRewind
                className="songicon"
                style={{ fontSize: 'xx-large' }}
              />
            </a>
            <a onClick={this.togglePlay.bind(this)}>{btnPlayer}</a>
            <a onClick={onNext}>
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
            <div style={{ width: progress * 100 + '%' }} />
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
          autoPlay={is_playing}
          onEnded={() => onDone()}
        >
          <source />
        </audio>
      </div>
    );
  }
}
Player.Proptype = {
  src: PropTypes.string.isRequired,
  loop: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

export default Player;
