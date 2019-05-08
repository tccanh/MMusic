import React from './node_modules/react';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome';
import { faImage } from './node_modules/@fortawesome/free-solid-svg-icons';

export default props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single">
        <FontAwesomeIcon
          icon={props.icon ? props.icon : faImage}
          color="#3B5998"
          size={props.sizze ? props.sizze : '5x'}
        />
      </label>
      <input
        type="file"
        id="single"
        onChange={props.onChange}
        accept={props.accept ? props.accept : 'image/*'}
      />
    </div>
  </div>
);
