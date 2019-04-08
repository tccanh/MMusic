import { TRACK_LOADING, GET_TRACKS, ADD_TRACK } from '../actions/actionTypes';
const initialState = {
  tracks: [],
  track: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TRACKS:
      return {
        ...state,
        tracks: payload,
        loading: false
      };
    case ADD_TRACK:
      return {
        ...state,
        tracks: [payload, ...state.posts]
      };

    default:
      return state;
  }
};
