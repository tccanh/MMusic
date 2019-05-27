import axios from 'axios';
import {
  GET_ALBUMS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ALBUM_LOADING,
  GET_ALBUM
} from './actionTypes';

export const setAlbumLoading = () => {
  return {
    type: ALBUM_LOADING
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
export const createAlbum = (data, history) => dispatch => {
  axios
    .post('/api/album', data)
    .then(res => history.push('/album'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAlbums = () => dispatch => {
  dispatch(setAlbumLoading());
  axios
    .get('/api/album')
    .then(res =>
      dispatch({
        type: GET_ALBUMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALBUMS,
        payload: null
      })
    );
};
export const getAlbum = id => dispatch => {
  dispatch(setAlbumLoading());
  dispatch(clearAlum());
  axios
    .get(`/api/album/${id}`)
    .then(res =>
      dispatch({
        type: GET_ALBUM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALBUM,
        payload: null
      })
    );
};

export const clearAlum = () => dispatch =>
  dispatch({
    type: GET_ALBUM
  });
