import axios from 'axios';
import {
  GET_TRACKS,
  CLEAR_ERRORS,
  GET_ERRORS,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS,
  GET_TRACK,
  TRACK_LOADING
} from './actionTypes';

export const getTracks = () => dispatch => {
  //getLoadding
  dispatch(setTrackLoading());
  axios
    .get('/api/track')
    .then(res => {
      dispatch({
        type: GET_TRACKS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TRACKS,
        payload: null
      })
    );
};

// Get Post
export const getTrack = id => dispatch => {
  dispatch(setTrackLoading());
  axios
    .get(`/api/track/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRACK,
        payload: null
      })
    );
};

export const createTrack = (data, history) => dispatch => {
  axios
    .post('/api/track', data)
    .then(res => history.push('/chart'))
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
// Set loading state
export const setTrackLoading = () => {
  return {
    type: TRACK_LOADING
  };
};
