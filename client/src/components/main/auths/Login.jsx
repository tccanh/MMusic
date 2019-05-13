import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextAuth from '../../hoc/TextAuth';
import {
  loginUser,
  GoogleOauth,
  FacebookOauth
} from '../../../actions/auth.action';

import { FBkey, GGkey } from './Key';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
class Register extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    FacebookOauth: PropTypes.func.isRequired,
    GoogleOauth: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextPops) {
    if (nextPops.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextPops.errors) {
      this.setState({ errors: nextPops.errors });
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
    const { errors, username, password } = this.state;
    return (
      <div id="login-box">
        <div className="left">
          <h1>Sign in</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <TextAuth
              type="text"
              onChange={this.onChange}
              name="username"
              value={username}
              placeholder="Username"
            />

            <TextAuth
              type="password"
              onChange={this.onChange}
              name="password"
              value={password}
              placeholder="Password"
            />

            {errors.login && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.login}
              </div>
            )}
            <input type="submit" name="signup_submit" value="Login now" />
          </form>
        </div>

        <div className="right">
          <Link to="/register">
            <button className="social-signin twitter">
              Create new account
            </button>
          </Link>
          <FacebookLogin
            appId={FBkey}
            callback={res => this.props.FacebookOauth(res)}
            render={renderProps => (
              <button
                onClick={() => renderProps.onClick()}
                className="social-signin facebook"
              >
                Log in with Facebook
              </button>
            )}
          />

          <GoogleLogin
            clientId={GGkey}
            render={renderProps => (
              <button
                onClick={() => renderProps.onClick()}
                disabled={renderProps.disabled}
                className="social-signin google"
              >
                Log in with Google+
              </button>
            )}
            buttonText="Login"
            onSuccess={value => {
              this.props.GoogleOauth(value);
            }}
            onFailure={() => this.responseGoogle()}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div className="or">OR</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  loginUser,
  GoogleOauth,
  FacebookOauth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
