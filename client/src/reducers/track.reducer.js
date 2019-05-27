import {
  TRACK_LOADING,
  GET_TRACKS,
  ADD_TRACK,
  GET_TRACK,
  GET_TRACKS_LOVE
} from '../actions/actionTypes';
const initialState = {
  tracks: [],
  track: {},
  tracks_love: [],
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
    case GET_TRACKS_LOVE:
      return {
        ...state,
        tracks_love: payload,
        loading: false
      };
    case ADD_TRACK:
      return {
        ...state,
        tracks: [payload, ...state.tracks]
      };
    case GET_TRACK:
      return {
        ...state,
        track: payload,
        loading: false
      };
    default:
      return state;
  }
};
