import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Drawer, IconButton, Navigation } from 'react-mdl';
import isAdmin from '../../utils/Utils';

class DrawerBar extends Component {
  render() {
    return (
      <Drawer title="Trak-Bon Docs">
        {this.props.auth.isAuthenticated ?
          <Navigation>
            <Link to="/dashboard">
              <IconButton colored name="home" />
              <span> Home </span>
            </Link>
            <Link to="/editor">
              <IconButton colored name="note_add" />
              <span> Create Document </span>
            </Link>
            <Link to="/documents">
              <IconButton colored name="list" />
              <span> My documents </span>
            </Link>
            <Link to="/folders">
              <IconButton colored name="folder" />
              <span> Folder </span>
            </Link>
            {isAdmin ?
              <div>
                <Link to="/manageusers">
                  <IconButton colored name="supervisor_account" />
                  <span> Users </span>
                </Link>
                <Link to="/manageroles">
                  <IconButton colored name="control_point_duplicate" />
                  <span> Roles </span>
                </Link>
              </div>
            :
              <span />
            }
            <hr />
            <Link to="/settings">
              <IconButton colored name="settings" />
              <span> Settings </span>
            </Link>
            <Link to="/help">
              <IconButton colored name="help" />
              <span> Help </span>
            </Link>
          </Navigation>
          : <h4 className="drawer-notice"> Please log in </h4>
        }
      </Drawer>
    );
  }
}

DrawerBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DrawerBar);
