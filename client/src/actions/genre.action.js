import axios from 'axios';
import {
  GET_GENRES,
  GENRE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_GENRE
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
export const addGenre = genreData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/genre', genreData)
    .then(res =>
      dispatch({
        type: ADD_GENRE,
        payload: res.data
      })
    )
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
