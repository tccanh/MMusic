import { GET_ALBUMS, ALBUM_LOADING } from '../actions/actionTypes';
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

    default:
      return state;
  }
};