import {
  ARTIST_LOADING,
  GET_ARTISTS,
  GET_ARTIST,
  CLEAR_ARTIST
} from '../actions/actionTypes';
const initialState = {
  artists: [],
  artist: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: payload,
        loading: false
      };
    case GET_ARTIST:
      return {
        ...state,
        artist: payload,
        loading: false
      };
    case CLEAR_ARTIST:
      return {
        ...state,
        artist: {},
        loading: false
      };

    default:
      return state;
  }
};
