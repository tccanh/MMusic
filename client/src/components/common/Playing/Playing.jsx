import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    top: 64
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  content: {
    textAlign: 'center' // css của nó ở đây
  },
  lists: {
    cursor: 'pointer'
  },
  current: {
    background: 'red'
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
          <h1>Playlist</h1>
          <hr />
          <ul>
            {props.songs &&
              props.songs.map((song, index) => {
                return (
                  <li
                    className={clsx(classes.lists, {
                      [classes.current]: index === props.curIndex
                    })}
                    key={index}
                    onClick={() => props.songPicker(index)}
                  >
                    {song.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </Drawer>
    </div>
  );
}

export default Playing;
