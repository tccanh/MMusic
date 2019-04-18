import axios from 'axios';
import { GET_ARTISTS, ARTIST_LOADING, GET_ERRORS } from './actionTypes';
// Set loading state
export const setArtistsLoading = () => {
  return {
    type: ARTIST_LOADING
  };
};
// Create Profile
export const createArtist = (data, history) => dispatch => {
  axios
    .post('/api/artist', data)
    .then(res => history.push('/artist'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Posts
export const getArtists = () => dispatch => {
  dispatch(setArtistsLoading());
  axios
    .get('/api/artist')
    .then(res =>
      dispatch({
        type: GET_ARTISTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTISTS,
        payload: null
      })
    );
};
