import React, { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
import store from './store';
//=================================================
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { setCurrentUser, logoutUser } from './actions/auth.action';
//=================================================
import Login from './views/modals/Login';
// import Register from './views/modals/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Landing from './components/Landing';
import mainLogin from './views/mainLogin';
import PrivateRoute from './HOC/PrivateRoute';
import Albums from './components/albums/Albums';
import Genres from './components/genres/Genres';
import Artists from './components/artists/Artists';
import Playlists from './components/playlists/Playlists';
//=================================================
//Check for token
// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user is authenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expried token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     // clear current profile
//     // store.dispatch(clearCurrentProfile());
//     //redirect to login
//     window.location.href = '/login';
//   }
// }
//=================================================
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Login />
          {/* <Register /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={mainLogin} />
          <Route exact path="/album" component={Albums} />
          <Route exact path="/genre" component={Genres} />
          <Route exact path="/artist" component={Artists} />
          <Route exact path="/playlist" component={Playlists} />
          <Switch />
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
