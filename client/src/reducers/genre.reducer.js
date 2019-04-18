import { GENRE_LOADING, GET_GENRES } from '../actions/actionTypes';
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
    // case ADD_GENRE:
    //   return {
    //     ...state,
    //     tracks: [payload, ...state.genre]
    //   };
    default:
      return state;
  }
};
