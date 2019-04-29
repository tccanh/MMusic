/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MediaCard.css';
export class MediaCard extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { link, image, title, artists } = this.props;
    return (
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
              {artists}
            </a>
          </h5>
          <p className="mb-0">{title}</p>

          <audio id="music" preload="true" autoPlay>
            <source src={link} />
          </audio>
          <div id="audioplayer">
            <i id="pButton" className="fas fa-play" />
            <div id="timeline">
              <div id="playhead" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaCard);
