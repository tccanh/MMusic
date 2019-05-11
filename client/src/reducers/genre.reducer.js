import {
  GENRE_LOADING,
  GET_GENRES,
  CLEAR_GENRE,
  GET_GENRE
} from '../actions/actionTypes';
const initialState = {
  genres: [],
  genre: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GENRE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
        loading: false
      };
    case GET_GENRE:
      return {
        ...state,
        genre: payload,
        loading: false
      };
    case CLEAR_GENRE:
      return {
        ...state,
        genre: {},
        loading: false
      };
    default:
      return state;
  }
};
