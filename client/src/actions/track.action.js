import axios from 'axios';
import { GET_TRACKS } from './actionTypes';
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
