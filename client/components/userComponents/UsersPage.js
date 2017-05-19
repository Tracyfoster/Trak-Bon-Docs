import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'react-mdl';
import UsersList from './UsersList';
import { fetchUsers, deleteUser } from '../../actions/adminActions';

class UsersPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <UsersList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          auth={this.props.auth}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  // updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log('userpage', state);
  return {
    users: state.admin,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersPage);
