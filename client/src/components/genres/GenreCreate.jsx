import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import TextFieldGroup2 from '../../HOC/TextFieldGroup2';
import { addGenre } from '../../actions/genre.action';
import { UploadImg } from '../upload/UploadImg';
export class GenreCreate extends Component {
  static propTypes = {
    addGenre: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image:
        'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      image: this.state.image
    };
    console.log(TrackData);
    this.props.addGenre(TrackData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h1 className="text-center title">Upload Music</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-8">
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
              </div>
            </div>
            <div className="col-md-4">
              <UploadImg />
            </div>
          </div>
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
  errors: state.errors
});

const mapDispatchToProps = {
  addGenre
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreCreate);
