import axios from 'axios';
import {
  GET_TRACKS,
  CLEAR_ERRORS,
  GET_ERRORS,
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
