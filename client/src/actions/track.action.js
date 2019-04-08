import axios from 'axios';
import {
  GET_TRACKS,
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_TRACK,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS
} from './actionTypes';
export const getTracks = () => dispatch => {
  //getLoadding
  //==================

  axios
    .get('/api/track')
    .then(res =>
      dispatch({
        type: GET_TRACKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRACKS,
        payload: null
      })
    );
};
export const addTrack = trackData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/track', trackData)
    .then(res =>
      dispatch({
        type: ADD_TRACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
export function uploadSuccess({ data }) {
  return {
    type: UPLOAD_SUCCESS,
    data
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_FAIL,
    error
  };
}
