import React, { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
//=================================================
import jwt_decode from 'jwt-decode';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
//=================================================
//Check for token
//=================================================
import Login from './views/modals/Login';
import Register from './views/modals/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Landing from './components/Landing';
import mainLogin from './views/mainLogin';
//=================================================
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={mainLogin} />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
