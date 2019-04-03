import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => history.push('./login'))
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
      //save to LocalStorage
      // const { token } = res.data;
      // //set token to ls
      // localStorage.setItem('jwtToken', token);
      // // set token to Auth header
      // setAuthToken(token);
      // // Decode token to get user data
      // const decoded = jwt_decode(token);
      // //Set Current user
      // dispatch(setCurrentUser(decoded));
      console.log('hellores ', res);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
