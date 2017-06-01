import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Cell, Button } from 'react-mdl';
import UsersList from './UsersList';
import UserModal from './UserModal';
import { fetchUsers, deleteUser, updateUser } from '../../actions/adminActions';

class UsersPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }


  render() {
    return (
      <Grid>
        {/*<Cell col={0}>
          <span />
        </Cell>*/}
        <Cell col={12}>
          <UserModal />
          <h3>Users List</h3>
          <UsersList
            allUsers={this.props.allUsers}
            deleteUser={this.props.deleteUser}
            auth={this.props.auth}
            context={this.context.router}
          />
        </Cell>
      </Grid>
    );
  }
}

UsersPage.contextTypes = {
  router: PropTypes.object
};

UsersPage.propTypes = {
  allUsers: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log('userpage', state);
  return {
    allUsers: state.admin.users,
    auth: state.auth,
  };
}

export default connect(mapStateToProps,
  { fetchUsers, deleteUser, updateUser })(UsersPage);
