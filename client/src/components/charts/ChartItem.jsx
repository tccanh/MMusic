import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
export default class ChartItem extends Component {
  render() {
    const { value } = this.props;
    return (
      <TableRow tabIndex={-1} key={value.id}>
        <TableCell component="th" scope="row" padding="left">
          {value.name}
        </TableCell>
        <TableCell align="left">{value.genres.name}</TableCell>
        {/* <TableCell align="right">Hello</TableCell> */}
        <TableCell align="right">{value.likes.length}</TableCell>
        <TableCell align="right">{value.views}</TableCell>
      </TableRow>
    );
  }
}
