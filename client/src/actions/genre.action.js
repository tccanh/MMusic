import axios from 'axios';
import {
  GET_GENRES,
  GENRE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_GENRE
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
export const getGenre = name => dispatch => {
  dispatch(setGenresLoading());
  dispatch(clearGenre());
  axios
    .get(`/api/genre/${name}`)
    .then(res =>
      dispatch({
        type: GET_GENRE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GENRE,
        payload: null
      })
    );
};

export const clearGenre = () => dispatch =>
  dispatch({
    type: GET_GENRE
  });
