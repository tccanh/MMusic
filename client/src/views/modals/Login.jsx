import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/auth.action';
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextPops) {
    if (nextPops.auth.isAuthenticated) {
      this.props.history.push('/');
      alert('done1');
    }
    if (nextPops.errors) {
      this.setState({ errors: nextPops.errors });
      alert('done2');
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      alert('done3');
      this.props.history.push('/');
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="modal fade" id="loginModal" tabIndex="-1">
        <div className="modal-dialog modal-login" role="document">
          <div className="modal-content">
            <div className="card card-signup card-plain">
              <div className="modal-header">
                <div className="card-header card-header-primary text-center">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    <i className="material-icons">clear</i>
                  </button>

                  <h4 className="card-title">Log in</h4>
                  <div className="social-line">
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-white"
                    >
                      <i className="fa fa-facebook-square" />
                    </a>
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-white"
                    >
                      <i className="fa fa-twitter" />
                      <div className="ripple-container" />
                    </a>
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-white"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <form className="form" method="" action="">
                  <div className="card-body">
                    <div className="form-group bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="material-icons">face</i>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={e => this.onChange(e)}
                          className="form-control"
                          placeholder="Username..."
                          error={errors.login}
                        />
                      </div>
                    </div>

                    <div className="form-group bmd-form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="material-icons">lock_outline</i>
                          </div>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={e => this.onChange(e)}
                          placeholder="Password..."
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <input
                      type="submit"
                      className="btn btn-primary btn-link btn-wd btn-lg"
                      value="Sign up"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
