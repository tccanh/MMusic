/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Add, Remove } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';

// const Volume = props => {
//   return (
//     <div className="volume">
//       <VolumeDown onClick={() => props.decreaseVolume()} />
//       {Math.floor(props.volume * 100)}
//       <VolumeUp onClick={() => props.increaseVolume()} />
//     </div>
//   );
// };

function Volume(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div>
      <a className="songicon volumesong" onClick={handleClick}>
        {Math.floor(props.volume * 100)}
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Remove className="voluebnt" onClick={() => props.decreaseVolume()} />
        <Add className="voluebnt" onClick={() => props.increaseVolume()} />
      </Popover>
    </div>
  );
}
Volume.propTypes = {
  decreaseVolume: PropTypes.func.isRequired,
  increaseVolume: PropTypes.func.isRequired
};
export default Volume;
