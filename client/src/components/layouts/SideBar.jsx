import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import {
  BarChart,
  LibraryMusic,
  PlaylistAdd,
  Album,
  Mic,
  CloudUpload,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  Person,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Menu
} from '@material-ui/icons';
import {
  likeTrack,
  unlikeTrack,
  increaseViews
} from '../../actions/track.action';
import { logoutUser } from '../../actions/auth.action';
import { NavLink } from 'react-router-dom';
import Audio from '../common/Player/Audio';
import { Collapse, Avatar } from '@material-ui/core';
const drawerWidth = 180;

const styles = theme => ({
  root: { color: 'white', fontSize: '2rem' },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: '#212121'
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
    width: 67
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  avatar: {
    maxHeight: 30,
    maxWidth: 30,
    marginRight: 30
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
    icon: Mic
  },
  {
    title: 'Playlist',
    to: '/playlist',
    icon: PlaylistAdd
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
      open: false,
      openCollapse: false,
      songs: undefined
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.song.songs !== this.props.song.songs) {
      const songs_ = newProps.song.songs.map(song => ({
        id: song._id,
        isLike: this.props.auth.isAuthenticated
          ? song.likes.filter(like => like.user === this.props.auth.user.id)
              .length > 0
          : false,
        authors: song.authors,
        artists: song.artists,
        name: song.name,
        image: song.image,
        link: song.link
      }));
      this.setState({
        songs: songs_
      });
    }
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleCollapse = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleLove(id) {
    return this.props.likeTrack(id);
  }
  handleUnLove(id) {
    return this.props.unlikeTrack(id);
  }
  increaseView(id) {
    return this.props.increaseViews(id);
  }
  render() {
    const { songs, openCollapse } = this.state;
    const { classes, theme } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const isAuthRender = isAuthenticated ? (
      <>
        <ListItem
          button
          onClick={() =>
            this.setState(pre => ({ openCollapse: !pre.openCollapse }))
          }
        >
          {user.avatar ? (
            <Avatar src={user.avatar} className={classes.avatar} />
          ) : (
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
          )}
          <ListItemText primary="Account" />
          {openCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/profile">
              <ListItem>
                <ListItemIcon>
                  <Person style={{ fontSize: 30, lineHeight: 1.5 }} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </NavLink>
            <ListItem button onClick={this.onLogoutClick}>
              <ListItemIcon>
                <ExitToApp style={{ fontSize: 30, lineHeight: 1.5 }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Collapse>
      </>
    ) : (
      <NavLink to="/login">
        <ListItem>
          <ListItemIcon>
            <AccountCircle style={{ fontSize: 30, lineHeight: 1.5 }} />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </NavLink>
    );
    return (
      <div className={classes.root}>
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
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Best Places to Upload Your Music
            </Typography>

            {songs && songs.length > 0 && (
              <Audio
                songs={songs}
                isAuthenticated={isAuthenticated}
                unLikeSong={this.handleUnLove.bind(this)}
                likeSong={this.handleLove.bind(this)}
                increaseView={this.increaseView.bind(this)}
              />
            )}
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
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {listLinks1.map((val, index) => (
              <NavLink to={val.to} key={val.title}>
                <ListItem button>
                  <ListItemIcon>
                    <val.icon
                      color="error"
                      style={{ fontSize: 30, lineHeight: 1.5 }}
                    />
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
                    <val.icon
                      color="error"
                      style={{ fontSize: 30, lineHeight: 1.5 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={val.title} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          {isAuthRender}
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  likeTrack: PropTypes.func.isRequired,
  unlikeTrack: PropTypes.func.isRequired,
  increaseViews: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  song: state.song
});

const mapDispatchToProps = {
  logoutUser,
  likeTrack,
  unlikeTrack,
  increaseViews
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SideBar));

// export default withStyles(styles, { withTheme: true })(SideBar);
