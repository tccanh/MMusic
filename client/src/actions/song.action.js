import {
  GET_SONGS,
  ADD_SONG,
  REMOVE_SONG,
  REMOVE_ALL,
  SONG_LOADING
} from './actionTypes';
// Set loading state
export const setSongsLoading = () => {
  return {
    type: SONG_LOADING
  };
};

// Get Posts
// export const getSongs = (srcs) => dispatch => {
//   dispatch(setSongsLoading());

// };
export const addSong = src => dispatch => {
  dispatch(setSongsLoading());
  dispatch({
    type: ADD_SONG,
    payload: src
  });
};
