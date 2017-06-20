import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Drawer, IconButton, Navigation } from 'react-mdl';
import isAdmin from '../../utils/Utils';

class DrawerBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const userLinks = (
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
        <Link to="/settings">
          <IconButton colored name="settings" />
          <span> Profile update </span>
        </Link>
      </Navigation>
    );

    const guestLinks = (
      <Navigation>
        <Link to="/help">
          <IconButton colored name="help" />
          <span> Help </span>
        </Link>
      </Navigation>
    );

    const adminLinks = (
      <span>
        <Navigation>
          <Link to="/manageusers">
            <IconButton colored name="supervisor_account" />
            <span> Users </span>
          </Link>
        </Navigation>
        <Navigation>
          <Link to="/manageroles">
            <IconButton colored name="control_point_duplicate" />
            <span> Roles </span>
          </Link>
        </Navigation>
      </span>
    );

    return (
      <Drawer title="Trak-Bon Docs" className="bauyvcahgvv">
          {
            this.props.auth.isAuthenticated && userLinks
          }
          <hr />
          {
            guestLinks
          }
          <hr />
          {
            isAdmin && adminLinks
          }
          <hr />
      </Drawer>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DrawerBar);
