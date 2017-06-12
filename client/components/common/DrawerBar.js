import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { IconButton, Navigation, Textfield, Drawer } from 'react-mdl';
import { logoutUser } from '../../actions/userActions';

class DrawerBar extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout(event) {
    event.preventDefault();
    this.props.dispatch(logoutUser());
    this.context.router.push('/');
  }

  render () {
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
              <hr />
              <Link to="/manageusers">
                <IconButton colored name="supervisor_account" />
                <span> Users </span>
              </Link>
              <Link to="/manageroles">
                <IconButton colored name="control_point_duplicate" />
                <span> Roles </span>
              </Link>
              <hr />
              <Link to="/settings">
                <IconButton colored name="settings" />
                <span> Settings </span>
              </Link>
              <Link to="/help">
                <IconButton colored name="help" />
                <span> Help </span>
              </Link>
              <a id="signout" href="#" onClick={this.signout}>
                <IconButton colored name="verified_user" />
                <span> Sign Out </span>
              </a>
          </Navigation>
          : <h4> Please log in </h4>
        }
      </Drawer>
    );
  }
}

DrawerBar.contextTypes = {
  router: PropTypes.object
};

DrawerBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(DrawerBar);