import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TableFooter,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from '@material-ui/core';

import EnhancedTableHead from '../../hoc/EnhancedTableHead';
import TablePaginationActions from '../../hoc/TablePaginationActions';
import TrackItem from './TrackItem';

const headerRows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  { id: 'genre', numeric: false, disablePadding: false, label: 'Genre' },
  { id: 'artists', numeric: false, disablePadding: false, label: 'Artists' },
  { id: 'like', numeric: true, disablePadding: false, label: 'Like' },
  { id: 'views', numeric: true, disablePadding: false, label: 'Views' }
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3
    // marginLeft: theme.spacing.unit * 4
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});
class ListTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value) });
  };

  render() {
    const { classes, tracks } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, tracks.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headerRows={headerRows}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={tracks.length}
            />
            <TableBody>
              {stableSort(tracks, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => {
                  return <TrackItem value={value} key={index} />;
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={tracks.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

ListTrack.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListTrack);
