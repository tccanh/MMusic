import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup2 = ({
  name,
  subClassName,
  id,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  col
}) => {
  return (
    <div className={'form-group ' + subClassName}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup2.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup2.defaultProps = {
  type: 'text'
};

export default TextFieldGroup2;
