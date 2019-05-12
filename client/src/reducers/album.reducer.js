import {
  GET_ALBUMS,
  ALBUM_LOADING,
  GET_ALBUM,
  CLEAR_ALBUM
} from '../actions/actionTypes';
const initialState = {
  albums: [],
  album: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ALBUM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALBUMS:
      return {
        ...state,
        albums: payload,
        loading: false
      };
    case GET_ALBUM:
      return {
        ...state,
        album: payload,
        loading: false
      };
    case CLEAR_ALBUM:
      return {
        ...state,
        album: {},
        loading: false
      };
    default:
      return state;
  }
};
