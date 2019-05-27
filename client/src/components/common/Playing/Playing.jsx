import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import clsx from 'clsx';
import formatTime from '../../../apis/formatTime';
import Divider from '@material-ui/core/Divider';
const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    top: 64
  },
  playlists: {
    backgroundColor: '#495057'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  content: {},
  listss: {
    '&:hover': {
      backgroundColor: '#ffaeae'
    }
  },
  child: {
    color: 'black'
  },
  currenttext: {
    color: 'white'
  },
  current: {
    '&:hover': {
      backgroundColor: '#f44336'
    },
    background: '#f44336',
    borderRadius: 20,
    borderBottom: 'unset',
    color: 'white'
  }
}));

function Playing(props) {
  const classes = useStyles();
  return (
    <div className={classes.playlists}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Divider />
        <div className={classes.content}>
          <p
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontFamily: 'cursive',
              fontWeight: 'bolder',
              fontSize: 20,
              paddingTop: 10
            }}
          >
            Playlist
          </p>
          <div className="playlist-tracks">
            <ol
              style={{
                paddingLeft: 'inherit',
                padding: 3,
                fontFamily: 'cursive'
              }}
            >
              {props.songs &&
                props.songs.map((song, index) => {
                  return (
                    <li
                      style={{
                        padding: 6,
                        borderRadius: 20,
                        cursor: 'pointer'
                      }}
                      className={clsx(classes.listss, {
                        [classes.current]: index === props.curIndex
                      })}
                      key={index}
                      onClick={() => props.songPicker(index)}
                    >
                      <span
                        className={clsx(classes.child, {
                          [classes.currenttext]: index === props.curIndex
                        })}
                        style={{ color: 'black' }}
                      >
                        {song.name}
                      </span>
                      <span
                        style={{ color: 'black', fontSize: 12, marginRight: 5 }}
                      >
                        {formatTime(song.duration)}
                      </span>
                    </li>
                  );
                })}
            </ol>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Playing;
