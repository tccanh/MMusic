import React, { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
import store from './store';
// import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//=================================================
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { setCurrentUser, logoutUser } from './actions/auth.action';
//=================================================
import Login from './components/main/auths/Login';
import PrivateRoute from './components/hoc/PrivateRoute';
import SideBar from './components/layouts/SideBar';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import Albums from './components/main/albums/Albums';
import CreateAlbum from './components/main/albums/CreateAlbum';
import Genres from './components/main/genres/Genres';
import CreateGenre from './components/main/genres/CreateGenre';
import Artists from './components/main/artists/Artists';
import CreateArtist from './components/main/artists/CreateArtist';
import Tracks from './components/main/tracks/Tracks';
import Playlists from './components/main/playlists/Playlists';
import Upload from './components/upload/Upload';
import ArtistDetail from './components/main/artists/ArtistDetail';
import GenresDetail from './components/main/genres/GenresDetail';
//=================================================
//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user is authenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expried token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // clear current profile
    // store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/login';
  }
}
//=================================================
const styles = theme => ({
  root: {
    display: 'flex',
    background: '#b6bdc3',
    height: '100%'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px 8px 6px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '-webkit-fill-available'
  }
});
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className={classes.root}>
            <SideBar />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/album" component={Albums} />
              <Route exact path="/genre" component={Genres} />
              <Route exact path="/genre/:name" component={GenresDetail} />
              <Route exact path="/artist" component={Artists} />
              <Route exact path="/artist/:id" component={ArtistDetail} />
              <Route exact path="/chart" component={Tracks} />
              <Switch>
                <PrivateRoute exact path="/playlist" component={Playlists} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-genre"
                  component={CreateGenre}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/upload" component={Upload} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-artist"
                  component={CreateArtist}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-album"
                  component={CreateAlbum}
                />
              </Switch>
            </main>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
