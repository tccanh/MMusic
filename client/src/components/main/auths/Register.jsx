import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAuth from '../../hoc/TextAuth';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../actions/auth.action';
import Notifications, { notify } from 'react-notify-toast';
import { GoogleOauth, FacebookOauth } from '../../../actions/auth.action';

import { FBkey, GGkey } from './Key';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    FacebookOauth: PropTypes.func.isRequired,
    GoogleOauth: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toast = notify.createShowQueue();
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
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(userData, this.props.history);
    this.toast('Create new account success, login now.', 'success', 3000);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, name, username, email, password, password2 } = this.state;
    return (
      <div id="register-box">
        <Notifications />
        <div className="left">
          <h1>Sign up</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <TextAuth
              type="text"
              onChange={this.onChange}
              error={errors.name}
              name="name"
              value={name}
              placeholder="Fullname"
            />
            <TextAuth
              type="text"
              onChange={this.onChange}
              error={errors.username}
              name="username"
              value={username}
              placeholder="Username"
            />
            <TextAuth
              type="text"
              onChange={this.onChange}
              error={errors.email}
              name="email"
              value={email}
              placeholder="E-mail"
            />
            <TextAuth
              type="password"
              onChange={this.onChange}
              error={errors.password}
              name="password"
              value={password}
              placeholder="Password"
            />
            <TextAuth
              type="password"
              onChange={this.onChange}
              error={errors.password2}
              value={password2}
              name="password2"
              placeholder="Retype password"
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <input type="submit" name="signup_submit" value="Sign me up" />
          </form>
        </div>

        <div className="right">
          <Link to="/login">
            <button className="social-signin twitter">
              Already have account? Login
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

const mapDispatchToProps = { registerUser, GoogleOauth, FacebookOauth };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
