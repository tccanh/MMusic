import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
export default class ChartItem extends Component {
  render() {
    const { value } = this.props;
    // const listArtist = value.artists.map(art => {
    //   return <Link to={`artist/${art.artist}`}> {art.name}, </Link>;
    // });
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
        <TableCell align="center">{value.genre}</TableCell>
        <TableCell align="center">{listArtist}</TableCell>
        <TableCell align="right">{value.likes.length}</TableCell>
        <TableCell align="right">{value.views}</TableCell>
        <TableCell align="right">Listen</TableCell>
      </TableRow>
    );
  }
}
