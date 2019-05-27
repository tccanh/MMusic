import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
export class GenreItem extends Component {
  static propTypes = {
    genre: PropTypes.object.isRequired
  };

  render() {
    const { genre } = this.props;
    return (
      <Link className="col-md-2" to={`/genre/${genre.name}`}>
        <img
          className=" img-thumbnail img-fluid"
          src={genre.image}
          alt={genre.name}
        />
        <h5 className="text-center title">{genre.name}</h5>
      </Link>
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
