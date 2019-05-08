import React, { Component } from 'react';
import './Upload.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldGroup2 from '../hoc/TextFieldGroup2';
import { getGenres } from '../../actions/genre.action';
import { createTrack } from '../../actions/track.action';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import Buttons from './subUpload/Buttons';
import Images from './subUpload/Images';
import Spinner from '../common/Spinner/Spinner';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
const toastColor = {
  background: 'red',
  text: '#fff'
};
const releaseYear = [
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2011',
  '2010'
];
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image:
        'https://res.cloudinary.com/dx6o8ihdt/image/upload/c_scale,w_500/v1555581186/images/Common/genredefault.jpg',
      artists: '',
      authors: '',
      album: '',
      genre: ['5c94e85aaf5c382f1ce434b1', 'Acoustic'],
      country: '',
      released: '2019',
      link: '',
      duration: '',
      format: '',
      bit_rate: '',
      bytes: '',
      images: [],
      media: [],
      isuploadImage: false,
      isuploadMedia: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeMedia = this.onChangeMedia.bind(this);
  }
  componentDidMount() {
    this.props.getGenres(); // cập nhật lúc đầu
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const trackData = {
      name: this.state.name,
      image: this.state.image,
      artists: this.state.artists,
      authors: this.state.authors,
      album: this.state.album,
      genre: this.state.genre,
      country: this.state.country,
      released: this.state.released,
      link: this.state.link,
      duration: this.state.duration,
      format: this.state.format,
      bit_rate: this.state.bit_rate,
      bytes: this.state.bytes
    };
    console.log('hehe', trackData);

    this.props.createTrack(trackData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  toast = notify.createShowQueue();

  onChangeImage = e => {
    const ImgErrs = [];
    const ImageFile = e.target.files[0];
    const formDataImage = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    if (types.every(type => ImageFile.type !== type)) {
      ImgErrs.push(`'${ImageFile.type}' is not a supported format`);
    }

    if (ImageFile.size > 1048576) {
      // 1MB
      ImgErrs.push(
        `'${ImageFile.name}' is too large, please pick a smaller file`
      );
    }

    formDataImage.append(0, ImageFile);

    if (ImgErrs.length) {
      return ImgErrs.forEach(err =>
        this.toast(err, 'custom', 2000, toastColor)
      );
    }

    this.setState({ isuploadImage: true });

    axios
      .request({
        url: '/api/upload/image-upload/tracks/500',
        method: 'POST',
        data: formDataImage
      })
      .then(images =>
        this.setState({
          isuploadImage: false,
          images: images.data,
          image: images.data[0].secure_url
        })
      )
      .catch(err => {
        err.json().then(e => {
          this.toast(e.message, 'custom', 2000, toastColor);
          this.setState({ isuploadImage: false });
        });
      });
  };
  onChangeMedia = e => {
    const MdaErrs = [];
    const MediaFile = e.target.files[0];
    const formDataMedia = new FormData();
    const types = ['audio/mp3'];

    if (types.every(type => MediaFile.type !== type)) {
      MdaErrs.push(`'${MediaFile.type}' is not a supported format`);
    }

    if (MediaFile.size > 20485760) {
      // 20MB
      MdaErrs.push(`'${MediaFile.name}' is too large, maximum is 20MB`);
    }

    formDataMedia.append(1, MediaFile);

    if (MdaErrs.length) {
      return MdaErrs.forEach(err =>
        this.toast(err, 'custom', 2000, toastColor)
      );
    }

    this.setState({ isuploadMedia: true });

    axios
      .request({
        url: '/api/upload/media-upload',
        method: 'POST',
        data: formDataMedia,
        onUploadProgress: p => {
          this.setState({ inLoad: p.loaded, inTotal: p.total });
          console.log(
            'PROCESS: ',
            this.state.inLoad,
            ' / ',
            this.state.inTotal
          );
        }
      })
      .then(media => {
        console.log(media);

        this.setState({
          isuploadMedia: false,
          media: media.data,
          link: media.data[0].secure_url,
          duration: media.data[0].duration,
          format: media.data[0].format,
          bit_rate: media.data[0].bit_rate,
          bytes: media.data[0].bytes
        });
      })
      .catch(err => {
        err.json().then(e => {
          this.toast(e.message, 'custom', 2000, toastColor);
          this.setState({ isuploadMedia: false });
        });
      });
  };

  render() {
    const { errors, isuploadImage, isuploadMedia, images, media } = this.state;
    const { genres } = this.props.genre;
    const uploadImageContent = () => {
      switch (true) {
        case isuploadImage:
          return <Spinner size="1x" />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              width="100px"
            />
          );
        default:
          return <Buttons onChange={this.onChangeImage} />;
      }
    };
    const uploadMediaContent = () => {
      switch (true) {
        case isuploadMedia:
          return <Spinner size="1x" />;
        case media.length > 0:
          return (
            // <MusicPlay
            //   image={this.state.image}
            //   title={this.state.name}
            //   link={this.state.link}
            //   artists={this.state.artists}
            // />
            <h1>thissong </h1>
          );
        default:
          return (
            <Buttons
              onChange={this.onChangeMedia}
              icon={faFileAudio}
              accept="audio/*"
            />
          );
      }
    };
    return (
      <div className="container">
        <h1 className="text-center title">UPLOAD</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-7">
              <TextFieldGroup2
                type="text"
                id="nameTrack"
                label="Name of track"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.name
                })}
                placeholder="Taylor Swift ..."
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <div className="row">
                <div className="col-md-7">
                  <TextFieldGroup2
                    type="text"
                    id="nameAlbum"
                    label="Album"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.album
                    })}
                    placeholder="Name of album ..."
                    name="album"
                    value={this.state.album}
                    onChange={this.onChange}
                    error={errors.album}
                  />
                </div>
                <div className="col-md-5">
                  <TextFieldGroup2
                    type="text"
                    id="nameCountry"
                    label="Country"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.country
                    })}
                    placeholder="Country..."
                    name="country"
                    value={this.state.country}
                    onChange={this.onChange}
                    error={errors.country}
                  />
                </div>
              </div>
              <p className="text-info" style={{ textAlign: 'center' }}>
                <strong>
                  * If 2 fields below have more than 1 items, please separate it
                  with a comma.
                </strong>
              </p>
              <TextFieldGroup2
                type="text"
                id="albumsArtist"
                label="Artists"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.artists
                })}
                placeholder="Taylor Swift, Rihana, ..."
                name="artists"
                value={this.state.artists}
                onChange={this.onChange}
                error={errors.artists}
              />

              <TextFieldGroup2
                type="text"
                id="nameArtists"
                label="Authors"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.authors
                })}
                placeholder="Author1, Author2, ..."
                name="authors"
                value={this.state.authors}
                onChange={this.onChange}
                error={errors.authors}
              />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group form-control-lg">
                    <label htmlFor="inputGenre">Genre</label>
                    <select
                      id="inputGenre"
                      className="form-control selectpicker"
                      data-style="btn btn-link"
                      name="genre"
                      onChange={this.onChange}
                    >
                      {genres.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-control-lg">
                    <label htmlFor="inputRealeadYear">Release year</label>
                    <select
                      id="inputRealeadYear"
                      className="form-control selectpicker"
                      name="released"
                      onChange={this.onChange}
                    >
                      {releaseYear.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <Notifications />
              <h4 className="text-center title">Music file</h4>
              <div className="buttons" id="musicID">
                {uploadMediaContent()}
              </div>
              <hr />
              <h4 className="text-center title">Image file</h4>
              <div className="buttons" id="imageID">
                {uploadImageContent()}
              </div>
            </div>
          </div>
          <br />
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

Upload.propTypes = {
  errors: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  genre: state.genre
});
const mapDispatchToProps = {
  getGenres,
  createTrack
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Upload));
