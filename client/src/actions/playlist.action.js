import axios from 'axios';
import { PLAYLIST_LOADING, GET_PLAYLISTS } from './actionTypes';
// Set loading state
export const setPlaylistsLoading = () => {
  return {
    type: PLAYLIST_LOADING
  };
};

// Get Posts
export const getPlaylists = () => dispatch => {
  dispatch(setPlaylistsLoading());
  axios
    .get('/api/playlist')
    .then(res =>
      dispatch({
        type: GET_PLAYLISTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PLAYLISTS,
        payload: null
      })
    );
};
