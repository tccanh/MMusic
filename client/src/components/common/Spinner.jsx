import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';

export default class Spinner extends Component {
  render() {
    return (
      <div className="rolling">
        <div className="spinner fadein">
          <FontAwesomeIcon icon={faBowlingBall} size="5x" color="red" />
        </div>
      </div>
    );
  }
}
