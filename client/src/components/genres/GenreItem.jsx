import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class GenreItem extends Component {
  static propTypes = {
    genre: PropTypes.object.isRequired
  };

  render() {
    const { genre } = this.props;
    return (
      <div className="col-md-2">
        <img
          className=" img-thumbnail img-fluid"
          src={genre.image}
          alt={genre.name}
        />
        <h5 className="text-center title">{genre.name}</h5>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreItem);
