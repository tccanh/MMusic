import {
  ADD_SONG,
  GET_SONGS,
  SONG_LOADING,
  REMOVE_ALL,
  REMOVE_SONG
} from '../actions/actionTypes';
const initialState = {
  songs: [],
  song: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SONG_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SONGS:
      return {
        ...state,
        songs: payload,
        loading: false
      };
    case ADD_SONG:
      return {
        ...state,
        songs: [payload, ...state.songs]
      };
    case REMOVE_ALL:
      return {
        ...state,
        songs: []
      };
    // case REMOVE_SONG:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};
