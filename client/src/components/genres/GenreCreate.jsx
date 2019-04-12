import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import axios from 'axios';
import Buttons from './Test/Buttons';
import Images from './Test/Images';
import Spinner from '../common/Spinner';

const toastColor = {
  background: 'red',
  text: '#fff'
};

export class GenreCreate extends Component {
  state = {
    uploading: false,
    images: [],
    inLoad: [],
    inTotal: 0
  };
  // componentDidMount() {
  //   fetch(`/wake-up`).then(res => {
  //     if (res.ok) {
  //       return this.setState({ loading: false });
  //     }
  //     const msg = 'Something is went wrong with Heroku';
  //     this.toast(msg, 'custom', 3000, toastColor);
  //   });
  // }
  toast = notify.createShowQueue();

  onChange = e => {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time';
      return this.toast(msg, 'custom', 3000, toastColor);
    }

    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      if (file.size > 1048576) {
        // 1MB
        errs.push(`'${file.size}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 3000, toastColor));
    }

    this.setState({ uploading: true });

    axios
      .request({
        url: '/api/upload/image-upload',
        method: 'POST',
        data: formData,
        onUploadProgress: p => {
          console.log(p);

          this.setState({ inLoad: p.loaded, inTotal: p.total });
        }
      })
      .then(images =>
        this.setState({
          uploading: false,
          images: images.data
        })
      )
      .catch(err => {
        err.json().then(e => {
          this.toast(e.message, 'custom', 3000, toastColor);
          this.setState({ uploading: false });
        });
      });
  };

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id);
  };

  removeImage = id => {
    this.setState({ images: this.filter(id) });
  };

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 3000, toastColor);
    this.setState({ images: this.filter(id) });
  };
  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };
    const { inLoad, inTotal } = this.state;
    return (
      <div>
        <Notifications />
        <h3>Loaded: {inLoad}</h3>
        <h3>Total: {inTotal}</h3>
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreCreate);
