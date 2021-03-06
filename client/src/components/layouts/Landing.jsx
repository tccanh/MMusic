import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="section text-center">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <h2 className="title">Let&apos;s talk product</h2>
              <h5 className="description">
                This is the paragraph where you can write more details about
                your product. Keep you user engaged by providing meaningful
                information. Remember that by this time, the user is curious,
                otherwise he wouldn&apos;t scroll to get here. Add a button if
                you want the user to see more.
              </h5>
            </div>
          </div>
          <div className="features">
            <div className="row">
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="material-icons">chat</i>
                  </div>
                  <h4 className="info-title">Free Chat</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="material-icons">verified_user</i>
                  </div>
                  <h4 className="info-title">Verified Users</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="material-icons">fingerprint</i>
                  </div>
                  <h4 className="info-title">Fingerprint</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section section-contacts">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <h2 className="text-center title">Work with us</h2>
              <h4 className="text-center description">
                Divide details about your product or agency work into parts.
                Write a few lines about each one and contact us about any
                further collaboration. We will responde get back to you in a
                couple of hours.
              </h4>
              <form className="contact-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Your Name</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Your Email</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleMessage"
                    className="bmd-label-floating"
                  >
                    Your Message
                  </label>
                  <textarea
                    type="email"
                    className="form-control"
                    rows="4"
                    id="exampleMessage"
                  />
                </div>
                <div className="row">
                  <div className="col-md-4 ml-auto mr-auto text-center">
                    <button className="btn btn-primary btn-raised">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
