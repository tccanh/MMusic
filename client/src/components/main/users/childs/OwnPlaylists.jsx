/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOwnPlaylists } from '../../../../actions/playlist.action';
import { Mic, Headset } from '@material-ui/icons';
class OwnPlaylists extends Component {
  static propTypes = {
    getOwnPlaylists: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    this.props.getOwnPlaylists();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.playlist) {
      this.setState({
        playlists: newProps.playlist.playlists
      });
    }
  }
  render() {
    const { playlists } = this.state;
    return (
      <div className="">
        <div className="box_playlist">
          <div>
            <div className="form-group form-check">
              <a className="btn btn-danger" style={{ color: 'white' }}>
                Tạo playlist
              </a>
            </div>
          </div>
        </div>
        <div className="table-responsive" id="list_table">
          <table className="table">
            <tbody>
              {playlists &&
                Object.keys(playlists).length > 0 &&
                playlists.map((playlist, key) => {
                  return (
                    <tr key={key} id={playlist.id}>
                      <td>
                        <div className="media">
                          <a className="mr-3">
                            <img src={playlist.image} alt={playlist.name} />
                          </a>
                          <div className="media-body">
                            <h4 className="media-title">
                              <a title={playlist.name}>{playlist.name}</a>
                            </h4>
                            <ul className="list-unstyled">
                              <li>
                                <Mic style={{ fontSize: 15 }} /> 0
                              </li>
                              <li>
                                <Headset style={{ fontSize: 14 }} /> 0
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <a className="btn btn-danger">Chỉnh sửa</a>
                        <a className="btn btn-secondary">Xóa</a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ playlist: state.playlist });

const mapDispatchToProps = { getOwnPlaylists };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnPlaylists);
