import axios from 'axios';
import { GET_ARTISTS, ARTIST_LOADING } from './actionTypes';
// Set loading state
export const setArtistsLoading = () => {
  return {
    type: ARTIST_LOADING
  };
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
