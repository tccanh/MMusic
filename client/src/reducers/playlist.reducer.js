import {
  GET_PLAYLISTS,
  PLAYLIST_LOADING,
  ADD_PLAYLIST
} from '../actions/actionTypes';
const initialState = {
  playlists: [],
  playlist: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: payload,
        loading: false
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        playlists: [payload, ...state.playlists]
      };

    default:
      return state;
  }
};
