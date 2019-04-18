import axios from 'axios';
import {
  GET_GENRES,
  GENRE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './actionTypes';
// Set loading state
export const setGenresLoading = () => {
  return {
    type: GENRE_LOADING
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Create Profile
export const createGenre = (data, history) => dispatch => {
  axios
    .post('/api/genre', data)
    .then(res => history.push('/genre'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getGenres = () => dispatch => {
  dispatch(setGenresLoading());
  axios
    .get('/api/genre')
    .then(res =>
      dispatch({
        type: GET_GENRES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GENRES,
        payload: null
      })
    );
};
