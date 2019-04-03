import axios from 'axios';
import { GET_ALBUMS } from './actionTypes';
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
