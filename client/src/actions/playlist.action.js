import axios from 'axios';
import {
  PLAYLIST_LOADING,
  GET_PLAYLISTS,
  GET_ERRORS,
  ADD_PLAYLIST
} from './actionTypes';
// Set loading state
export const setPlaylistsLoading = () => {
  return {
    type: PLAYLIST_LOADING
  };
};
export const createPlaylist = data => dispatch => {
  axios
    .post('/api/playlist', data)
    .then(res =>
      dispatch({
        type: ADD_PLAYLIST,
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
// Get Posts
export const getOwnPlaylists = () => dispatch => {
  dispatch(setPlaylistsLoading());
  axios
    .get('/api/playlist/owner')
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
