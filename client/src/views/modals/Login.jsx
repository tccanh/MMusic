import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { loginUser } from '../../actions/auth.action';
import InputAuth from '../../HOC/inputAuth';
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextPops) {
    if (nextPops.auth.isAuthenticated) {
      const { history } = this.props;
      history.push('/dashboard');
    }
    if (nextPops.errors) {
      this.setState({ errors: nextPops.errors });
    }
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     // this.props.history.push('/dashboard');
  //     const { history } = this.context;
  //     history.push('/dashboard');
  //   }
  // }

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
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="card-body">
                    <InputAuth
                      type="username"
                      className={classnames('form-control', {
                        'text-danger': errors.login
                      })}
                      placeholder="Username..."
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      icon="face"
                    />
                    <InputAuth
                      type="password"
                      className={classnames('form-control', {
                        'text-danger': errors.login
                      })}
                      placeholder="Password..."
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      icon="lock_outline"
                      error={errors.login}
                    />
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
)(withRouter(Login));
