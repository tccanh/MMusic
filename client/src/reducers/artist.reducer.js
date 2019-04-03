import { ARTIST_LOADING, GET_ARTISTS } from '../actions/actionTypes';
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

    default:
      return state;
  }
};
