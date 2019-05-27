import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer footer-default fixed-bottom">
        <div className="container">
          <div
            className="copyright float-right"
            style={{ fontWeight: 'bold', color: '#000000' }}
          >
            &copy; Best Places to Upload Your Music
          </div>
        </div>
      </footer>
    );
  }
}
