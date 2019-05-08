import { ADD_SONG, ADD_SONGS, REMOVE_ALL, SONG_LOADING } from './actionTypes';
// Set loading state
export const setSongsLoading = () => {
  return {
    type: SONG_LOADING
  };
};
export const addSongs = songs => dispatch => {
  dispatch(setSongsLoading());
  dispatch(removeAllSong());
  dispatch({
    type: ADD_SONGS,
    payload: songs
  });
};
export const addSong = src => dispatch => {
  dispatch(setSongsLoading());
  dispatch({
    type: ADD_SONG,
    payload: src
  });
};
export const removeAllSong = () => dispatch => {
  dispatch({ type: REMOVE_ALL });
};
