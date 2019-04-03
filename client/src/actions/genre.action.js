import axios from 'axios';
import { GET_GENRES, GENRE_LOADING } from './actionTypes';
// Set loading state
export const setGenresLoading = () => {
  return {
    type: GENRE_LOADING
  };
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
