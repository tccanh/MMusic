/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
export class NavBar extends Component {
  render() {
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
          <div className="navbar-collapse">
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
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#pablo" className="nav-link">
                  <i className="material-icons">cloud_upload</i>
                </a>
              </li>
              <li className="nav-item">
                <a href="#pablo" className="nav-link">
                  <i className="material-icons">notifications</i>
                </a>
              </li>
              <li class="dropdown nav-item">
                <a
                  href="#pablo"
                  class="profile-photo dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <div class="profile-photo-small">
                    <img
                      src="https://res.cloudinary.com/dx6o8ihdt/image/upload/v1553359686/images/tracks/bw8yk7p3jurxxfsgzdpf.jpg"
                      alt="Circle Image"
                      class="rounded-circle img-fluid"
                    />
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <h6 class="dropdown-header">Dropdown header</h6>
                  <a href="#pablo" class="dropdown-item">
                    Me
                  </a>
                  <a href="#pablo" class="dropdown-item">
                    Settings and other stuff
                  </a>
                  <a href="#pablo" class="dropdown-item">
                    Sign out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
