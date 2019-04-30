import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { PlayArrowRounded } from '@material-ui/icons';
import { addSong } from '../../actions/song.action';
class ChartItem extends Component {
  onToggleListen(song) {
    this.props.addSong(song);
    console.log('ADDED');
  }
  render() {
    const { value } = this.props;
    const listArtist = value.artists
      .map(art => {
        return art.name;
      })
      .join(',  ');

    return (
      <TableRow tabIndex={-1} key={value._id}>
        <TableCell component="th" scope="row" align="center" padding="none">
          <Link to={`track/${value._id}`}>
            {value.name}
            <strong />
          </Link>
        </TableCell>
        <TableCell align="center">{value.genre.name}</TableCell>
        <TableCell align="center">{listArtist}</TableCell>
        <TableCell align="right">{value.likes.length}</TableCell>
        <TableCell align="right">{value.views}</TableCell>
        <TableCell align="right">
          <a onClick={() => this.onToggleListen(value)}>
            <PlayArrowRounded />
          </a>
        </TableCell>
      </TableRow>
    );
  }
}
const mapStateToProps = state => ({
  track: state.track
});

const mapDispatchToProps = {
  addSong
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartItem);
