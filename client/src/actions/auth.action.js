import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //Remove user profile
  //   dispatch(clearCurrentProfile());
};

export const GoogleOauth = response => dispatch => {
  const avatar = response.profileObj.imageUrl;
  const googleID = response.googleId;
  const name = response.profileObj.name;
  const email = response.profileObj.email;
  const data = { avatar, googleID, name, email };
  axios
    .post('/auth/google', data)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      return dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const FacebookOauth = response => dispatch => {
  const avatar = `http://graph.facebook.com/${
    response.userID
  }/picture?type=large`;
  const facebookID = response.userID;
  const name = response.name;

  const data = { avatar, facebookID, name };
  axios
    .post('/auth/facebook', data)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
