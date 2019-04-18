import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldGroup2 from '../../HOC/TextFieldGroup2';
import TextAreaGroup from '../../HOC/TextAreaGroup';
import { createArtist } from '../../actions/artist.action';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import Buttons from '../upload/subUpload/Buttons';
import Images from '../upload/subUpload/Images';
import Spinner from '../common/Spinner';

const toastColor = {
  background: 'red',
  text: '#fff'
};

class CreateArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image:
        'https://res.cloudinary.com/dx6o8ihdt/image/upload/v1555578133/images/Common/userdefault.png',
      description: '',
      albums: '',
      genres: '',
      images: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const artistData = {
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      albums: this.state.albums,
      genres: this.state.genres
    };
    this.props.createArtist(artistData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  toast = notify.createShowQueue();

  onChangeIMG = e => {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 1) {
      const msg = 'Only 1 images can be uploaded at a time';
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
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 3000, toastColor));
    }

    this.setState({ uploading: true });

    axios
      .request({
        url: '/api/upload/image-upload/artists/1000',
        method: 'POST',
        data: formData,
        onUploadProgress: p => {
          this.setState({ inLoad: p.loaded, inTotal: p.total });
        }
      })
      .then(images =>
        this.setState({
          uploading: false,
          images: images.data,
          image: images.data[0].secure_url
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
    const { errors, uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner size="3x" />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              width="350px"
            />
          );
        default:
          return <Buttons onChange={this.onChangeIMG} />;
      }
    };
    return (
      <div className="container">
        <h1 className="text-center title">New Artist</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-7">
              <TextFieldGroup2
                type="text"
                id="nameArtist"
                label="Name of artist"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.name
                })}
                placeholder="Taylor Swift ..."
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <h5 className="text-info" style={{ textAlign: 'center' }}>
                <strong>
                  If 2 fields below have more than 1 items, please separate it
                  with a comma.
                </strong>
              </h5>
              <TextFieldGroup2
                type="text"
                id="albumsArtist"
                label="Top of albums"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.albums
                })}
                placeholder="1989, Reputation, ..."
                name="albums"
                value={this.state.albums}
                onChange={this.onChange}
                error={errors.albums}
              />

              <TextFieldGroup2
                type="text"
                id="genresArtist"
                label="Style of music / Genres"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.genres
                })}
                placeholder="Pop, Country, ..."
                name="genres"
                value={this.state.genres}
                onChange={this.onChange}
                error={errors.genres}
              />

              <TextAreaGroup
                id="descriptionArtist"
                label="Description"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.description
                })}
                placeholder="A few descriptions of this artist ..."
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                rows="5"
              />
            </div>
            <div className="col-md-5">
              <Notifications />
              <div className="buttons" id="imageID">
                {content()}
              </div>
            </div>
          </div>
          <br />
          <div className="form-row justify-content-md-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-secondary"
            />
          </div>
        </form>
      </div>
    );
  }
}

CreateArtist.propTypes = {
  errors: PropTypes.object.isRequired,
  createArtist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
const mapDispatchToProps = {
  createArtist
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateArtist));
