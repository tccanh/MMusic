import React, { Component } from 'react';
import { connect } from 'react-redux';
import spinner from './spinner.gif';
export class Spinner extends Component {
  render() {
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);
