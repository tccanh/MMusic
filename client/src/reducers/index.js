import { combineReducers } from 'redux';
import errorReducer from './error.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
import albumReducer from './album.reducer';
import genreReducer from './genre.reducer';
import artistReducer from './artist.reducer';
import playlistReducer from './playlist.reducer';
export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  album: albumReducer,
  genre: genreReducer,
  artist: artistReducer,
  playlist: playlistReducer
});
