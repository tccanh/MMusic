import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const textAreaGroup = ({
  name,
  subClassName,
  id,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled,
  rows
}) => {
  return (
    <div className={'form-group ' + subClassName}>
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>
      <textarea
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
        rows={rows}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

textAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

textAreaGroup.defaultProps = {
  type: 'text'
};

export default textAreaGroup;
