import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import TextFieldGroup2 from '../../HOC/TextFieldGroup2';
import { withStyles } from '@material-ui/core/styles';
import { getGenres } from '../../actions/genre.action';
import { addTrack } from '../../actions/track.action';
import { Button } from '@material-ui/core';
const releaseYear = [
  {
    value: '2019',
    label: '2019'
  },
  {
    value: '2018',
    label: '2018'
  },
  {
    value: '2017',
    label: '2017'
  },
  {
    value: '2016',
    label: '2016'
  },
  {
    value: '2015',
    label: '2015'
  },
  {
    value: '2014',
    label: '2014'
  },
  {
    value: '2013',
    label: '2013'
  }
];
export class Upload extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image:
        'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png',
      artists: '',
      album: '',
      genre: '5c94e85aaf5c382f1ce434b1',
      country: '',
      track: null,
      released: '2019',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getGenres(); // cập nhật lúc đầu
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const TrackData = {
      name: this.state.name,
      image: this.state.image,
      artists: this.state.artists,
      album: this.state.album,
      genre: this.state.genre,
      country: this.state.country,
      track: this.state.track,
      released: this.state.released
    };
    console.log(TrackData);
    this.props.addTrack(TrackData);
  }
  fileChangedHandler = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { genres } = this.props.genre;
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className="container">
        <h1 className="text-center title">Upload Music</h1>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="form-row">
            <TextFieldGroup2
              type="text"
              id="nameMusic"
              label="Music Title"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.name
              })}
              subClassName="col-md-5"
              placeholder="I Don't Wanna Live Forever"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup2
              type="text"
              id="nameofArtists"
              label="Artists"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.artists
              })}
              subClassName="col-md-7"
              placeholder="Taylor Swift,  Zayn Malik,  ..."
              name="artists"
              value={this.state.artists}
              onChange={this.onChange}
              error={errors.artists}
            />
          </div>
          <div className="form-row ">
            <TextFieldGroup2
              type="text"
              id="nameOfAlbum"
              label="Albums"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.album
              })}
              subClassName="col-md-5"
              placeholder="Name of album ..."
              name="album"
              value={this.state.album}
              onChange={this.onChange}
              error={errors.album}
            />
            <div className="form-group col-md-4">
              <label htmlFor="inputGenre">Genres</label>
              <select
                id="inputGenre"
                className="form-control selectpicker"
                data-style="btn btn-link"
                name="genre"
                onChange={this.onChange}
              >
                {genres.map(option => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row ">
            <TextFieldGroup2
              type="text"
              id="nameOfCountry"
              label="Country"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.country
              })}
              subClassName="col-md-5"
              placeholder="Name of album ..."
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              error={errors.country}
            />
            <div className="form-group col-md-3">
              <label htmlFor="inputRealeadYear">Release year</label>
              <select
                id="inputRealeadYear"
                className="form-control selectpicker"
                name="released"
                onChange={this.onChange}
              >
                {releaseYear.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            accept="image/*"
            name="image"
            className={classes.input}
            id="outlined-button-file1"
            multiple
            type="file"
            style={{ display: 'none' }}
            onChange={this.fileChangedHandler}
          />
          <label htmlFor="outlined-button-file1">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
            >
              Image
            </Button>
          </label>
          <input
            accept="audio/*"
            name="track"
            className={classes.input}
            id="outlined-button-file2"
            multiple
            type="file"
            style={{ display: 'none' }}
            onChange={this.fileChangedHandler}
          />
          <label htmlFor="outlined-button-file2">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
            >
              Track
            </Button>
          </label>
          {errors.FileUpload && (
            <div className="invalid-feedback">{errors.FileUpload}</div>
          )}
          <div className="form-row justify-content-md-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-default btn-block col-md-7"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genre: state.genre,
  errors: state.errors
});

const mapDispatchToProps = {
  getGenres,
  addTrack
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Upload));
