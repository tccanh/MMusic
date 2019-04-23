import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';

export default class Spinner extends Component {
  render() {
    const { size } = this.props;
    return (
      <div className="rolling">
        <div className="spinner fadein">
          <FontAwesomeIcon
            icon={faBowlingBall}
            size={size ? size : '2x'}
            color="red"
          />
        </div>
      </div>
    );
  }
}
