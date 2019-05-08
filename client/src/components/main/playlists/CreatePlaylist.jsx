import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldGroup2 from '../../hoc/TextFieldGroup2';
import TextAreaGroup from '../../hoc/TextAreaGroup';
import { createPlaylist } from '../../../actions/playlist.action';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import Buttons from '../../upload/subUpload/Buttons';
import Images from '../../upload/subUpload/Images';
import Spinner from '../../common/Spinner/Spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
const toastColor = {
  background: 'red',
  text: '#fff'
};

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image:
        'https://res.cloudinary.com/dx6o8ihdt/image/upload/c_scale,w_500/v1555595309/images/Common/playlistdefault.jpg',
      description: '',
      publics: false,
      images: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const playlistData = {
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      publics: this.state.publics
    };
    console.log(playlistData);

    this.props.createPlaylist(playlistData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

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
        url: '/api/upload/image-upload/playlists/500',
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
              width="300px"
            />
          );
        default:
          return <Buttons onChange={this.onChangeIMG} sizze="10x" />;
      }
    };
    const { open, handleClose } = this.props;
    return (
      <div className="container">
        <Dialog
          maxWidth="md"
          scroll="body"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className="container">
            <DialogTitle id="form-dialog-title">New Playlist</DialogTitle>
            <form onSubmit={this.onSubmit} style={{ marginLeft: '15px' }}>
              <div className="row">
                <div className="col-md-7">
                  <TextFieldGroup2
                    type="text"
                    id="namePlaylist"
                    label="Name of playlist"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder="My favorite songs ..."
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextAreaGroup
                    id="descriptionPlaylist"
                    label="Description"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.description
                    })}
                    placeholder="A few descriptions of this playlist ..."
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    rows="5"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="publics"
                        checked={this.state.publics}
                        onChange={this.handleChange('publics')}
                        value="publics"
                      />
                    }
                    label="Public"
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
                  className="btn btn-outline-primary"
                />
              </div>
            </form>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

CreatePlaylist.propTypes = {
  errors: PropTypes.object.isRequired,
  createPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
const mapDispatchToProps = {
  createPlaylist
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePlaylist));
