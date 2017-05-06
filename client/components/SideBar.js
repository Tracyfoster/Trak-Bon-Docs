/** jsx */
import React, { Component } from 'react';
import { IconButton } from 'react-mdl';


class SideBar extends Component {
  render() {
    return (
      <div>
        <div>
          <IconButton colored name="home" />
          <span> Home </span>
        </div>
        <div>
          <IconButton colored name="drafts" />
          <span> Drafts </span>
        </div>
        <div>
          <IconButton colored name="folder" />
          <span> Folder </span>
        </div>
        <hr />
        <div>
          <IconButton colored name="supervisor_account" />
          <span> Users </span>
        </div>
        <div>
          <IconButton colored name="control_point_duplicate" />
          <span> Roles </span>
        </div>
        <hr />
        <div>
          <IconButton colored name="settings" />
          <span> Settings </span>
        </div>
        <div>
          <IconButton colored name="help" />
          <span> Help </span>
        </div>
      </div>
    );
  }
}

export default SideBar;