/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import { logoutUser } from '../../actions/auth.action';
export class NavBar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isAuthButton = isAuthenticated ? (
      <li className="dropdown nav-item">
        <a
          href="#pablo"
          className="profile-photo dropdown-toggle nav-link"
          data-toggle="dropdown"
        >
          <div className="profile-photo-small">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '35px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </div>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <h6 className="dropdown-header">Dropdown header</h6>
          <a href="#pablo" className="dropdown-item">
            Me
          </a>
          <a href="#pablo" className="dropdown-item">
            Settings and other stuff
          </a>
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="dropdown-item"
          >
            Sign out
          </a>
        </div>
      </li>
    ) : (
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="material-icons">input</i> Login
        </Link>
      </li>
    );
    return (
      <nav className="navbar navbar-expand-lg bg-dark text-white">
        <div className="container">
          <div className="navbar-translate">
            <a className="navbar-brand" href="/">
              <strong>MMusic</strong>
              <sup>
                <sup>
                  <sup>
                    <i className="material-icons">play_circle_outline</i>
                  </sup>
                </sup>
              </sup>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/chart">
                  Charts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/playlist">
                  Playlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/artist">
                  Artists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/album">
                  Albums
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/genre">
                  Genres
                </NavLink>
              </li>
            </ul>
          </div>

          <form className="form-inline ml-auto navbar-collapse">
            <div className="form-group has-white">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="btn btn-raised btn-fab btn-round btn-sm"
            >
              <i className="material-icons">search</i>
            </button>
          </form>
          {/* <div className="navbar-collapse">
          <button
            className="btn btn-dark btn-raised btn-fab btn-round btn-sm"
            data-toggle="modal"
            data-target="#registerModal"
          >
            <i className="material-icons">person_add</i>
          </button>
          <button
            className="btn btn-dark btn-raised btn-fab btn-round btn-sm"
            data-toggle="modal"
            data-target="#loginModal"
          >
            <i className="material-icons">how_to_reg</i>
          </button>
        </div> */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/upload">
                  <i className="material-icons">cloud_upload</i>
                </Link>
              </li>
              <li className="nav-item">
                <a href="#pablo" className="nav-link">
                  <i className="material-icons">notifications</i>
                </a>
              </li>
              {isAuthButton}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
