import React, { Component } from 'react';
import { Link } from 'react-router';
import { IconButton, Navigation, Textfield, Drawer } from 'react-mdl';

class DrawerBar extends Component {
  render () {
    return (
      <Drawer title="Trak-Bon Docs">
          <Navigation>
              <a>
                <IconButton colored name="home" />
                <span> Home </span>
              </a>
              <a>
                <IconButton colored name="documents" />
                <span> Create Document </span>
              </a>
              <a>
                <IconButton colored name="folder" />
                <span> Folder </span>
              </a>
              <hr />
              <a>
                <IconButton colored name="supervisor_account" />
                <span> Users </span>
              </a>
              <a>
                <IconButton colored name="control_point_duplicate" />
                <span> Roles </span>
              </a>
              <hr />
              <a>
                <IconButton colored name="settings" />
                <span> Settings </span>
              </a>
              <a>
                <IconButton colored name="help" />
                <span> Help </span>
              </a>
              <a>
                <IconButton colored name="signout" />
                <span> Sign Out </span>
              </a>
          </Navigation>
      </Drawer>
    );
  }
}

export default DrawerBar;