import { GET_PLAYLISTS, PLAYLIST_LOADING } from '../actions/actionTypes';
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

    default:
      return state;
  }
};
