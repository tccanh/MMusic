/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

export default class navBar extends Component {
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Charts
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Artists {/* <span className="sr-only">(current)</span> */}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Albums
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  For you
                </a>
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
              <li className="dropdown nav-item">
                <a
                  href="#pablo"
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">settings</i>
                  <b className="caret" />
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <h6 className="dropdown-header">Dropdown header</h6>
                  <a href="#pablo" className="dropdown-item">
                    Action
                  </a>
                  <a href="#pablo" className="dropdown-item">
                    Another action
                  </a>
                  <a href="#pablo" className="dropdown-item">
                    Something else here
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#pablo" className="dropdown-item">
                    Separated link
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#pablo" className="dropdown-item">
                    Logout
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
