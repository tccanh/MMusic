import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  BarChart,
  LibraryMusic,
  PlaylistPlay,
  Album,
  MicNone,
  CloudUpload,
  ExitToApp,
  PowerSettingsNew
} from '@material-ui/icons';

import { logoutUser } from '../../../actions/auth.action';
import { NavLink } from 'react-router-dom';
import Player from '../../common/Player';
const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 18,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

const listLinks1 = [
  {
    title: 'Chart',
    to: '/chart',
    icon: BarChart
  },
  {
    title: 'Album',
    to: '/album',
    icon: Album
  },
  {
    title: 'Genres',
    to: '/genre',
    icon: LibraryMusic
  },
  {
    title: 'Artist',
    to: '/artist',
    icon: MicNone
  },
  {
    title: 'Playlist',
    to: '/playlist',
    icon: PlaylistPlay
  }
];
const listLinks2 = [
  {
    title: 'Upload',
    to: '/upload',
    icon: CloudUpload
  }
];
class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const URL_songs = this.props.song.songs[0];
    const song_URL = URL_songs ? URL_songs : null;
    const { classes, theme } = this.props;
    const { isAuthenticated } = this.props.auth;
    const isAuthRender = isAuthenticated ? (
      <ListItem button onClick={this.onLogoutClick}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    ) : (
      <NavLink to="/login">
        <ListItem>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </NavLink>
    );
    return (
      <>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Best Places to Upload Your Music
            </Typography>

            <Player src={song_URL} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {listLinks1.map((val, index) => (
              <NavLink to={val.to} key={val.title}>
                <ListItem button>
                  <ListItemIcon>
                    <val.icon />
                  </ListItemIcon>
                  <ListItemText primary={val.title} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {listLinks2.map((val, index) => (
              <NavLink to={val.to} key={val.title}>
                <ListItem button>
                  <ListItemIcon>
                    <val.icon />
                  </ListItemIcon>
                  <ListItemText primary={val.title} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          {isAuthRender}
        </Drawer>
      </>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  song: state.song
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SideBar));

// export default withStyles(styles, { withTheme: true })(SideBar);
