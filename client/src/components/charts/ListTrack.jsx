import React, { Component } from 'react';
import CustomizationList from '../../HOC/CustomizationList';
const rows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  { id: 'genres', numeric: false, disablePadding: false, label: 'Genres' },
  // { id: 'artists', numeric: false, disablePadding: false, label: 'Artist' },
  { id: 'likes', numeric: true, disablePadding: false, label: 'Likes' },
  { id: 'views', numeric: true, disablePadding: false, label: 'Views' }
];

export default class ListTrack extends Component {
  render() {
    const { tracks } = this.props;
    return (
      <div>
        <CustomizationList data={tracks} headerRows={rows} />
      </div>
    );
  }
}
