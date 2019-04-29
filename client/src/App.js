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

import Footer from './components/layouts/Footer';
import Landing from './components/Landing';
import mainLogin from './views/mainLogin';
import PrivateRoute from './HOC/PrivateRoute';
import Albums from './components/albums/Albums';
import Genres from './components/genres/Genres';
import Artists from './components/artists/Artists';
import Playlists from './components/playlists/Playlists';
import Charts from './components/charts/Charts';
import Upload from './components/upload/Upload';
import CreateGenre from './components/genres/CreateGenre';
import CreateArtist from './components/artists/CreateArtist';
import CreateAlbum from './components/albums/CreateAlbum';
import PlaylistDetail from './components/playlists/PlaylistDetail';
import SideBar from './components/layouts/sidebar/SideBar';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
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
    display: 'flex'
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
    padding: theme.spacing.unit * 3
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
              <Route exact path="/login" component={mainLogin} />
              <Route exact path="/album" component={Albums} />
              <Route exact path="/genre" component={Genres} />
              <Route exact path="/artist" component={Artists} />
              <Route exact path="/chart" component={Charts} />
              <Route exact path="/track/:id" component={MusicPlayer} />
              <Route exact path="/test" component={PlaylistDetail} />
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
