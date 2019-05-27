import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LoveTracks from './childs/LoveTracks';
import OwnPlaylists from './childs/OwnPlaylists';
import UserTop from './UserTop';
import { Favorite, CloudUpload, PlaylistPlay } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange(e, v) {
    this.setState({ value: v });
  }
  render() {
    const { value } = this.state;
    const { classes } = this.props;
    const { user } = this.props.auth;
    return (
      <div className={classes.root}>
        <UserTop user={user} />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, value) => this.handleChange(e, value)}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab label="Playlists" icon={<PlaylistPlay />} />
            <Tab label="Songs" icon={<Favorite />} />
            <Tab label="Artists" icon={<Favorite />} />
            <Tab label="Upload file" icon={<CloudUpload />} />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <div className="container" style={{ marginTop: 50 }}>
            <OwnPlaylists />
          </div>
        )}
        {value === 1 && (
          <div className="container" style={{ marginTop: 50 }}>
            <LoveTracks />
          </div>
        )}
        {value === 2 && (
          <div className="container" style={{ marginTop: 50 }}>
            <h1>hehe</h1>
          </div>
        )}
        {value === 3 && (
          <div className="container" style={{ marginTop: 50 }}>
            <h1>hehe</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
