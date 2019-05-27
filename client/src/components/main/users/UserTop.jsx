/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';
const UserTop = props => {
  const { user } = props;
  return (
    <div className="box_profile">
      <div className="container">
        <div className="media user11">
          <div className="media-left mr-4 align-self-center">
            <a href="#">
              <img id="view_user_avatar_2" src={user.avatar} alt={user.name} />
            </a>
          </div>
          <div className="media-body align-self-center">
            <ul className="list-inline">
              <h4 className="media-title user_name">{user.name}</h4>
              <li className="list-inline-item">
                <b>0</b> <small> upload</small>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-secondary btn-secondary-gray click_modal_profile"
              data-toggle="modal"
              data-target=".edit_profile"
            >
              Chỉnh sửa <Edit style={{ fontSize: 14 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserTop.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserTop;
