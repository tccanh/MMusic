import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputAuth = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="form-group bmd-form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="material-icons">{icon}</i>
          </div>
        </div>
        <input
          type={type}
          className={classnames('form-control', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

InputAuth.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputAuth.defaultProps = {
  type: 'text'
};

export default InputAuth;
