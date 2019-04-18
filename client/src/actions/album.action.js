import axios from 'axios';
import { GET_ALBUMS, GET_ERRORS } from './actionTypes';

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
  //getLoadding
  //==================

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
