import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Cell, Button, Textfield, IconButton } from 'react-mdl';
import UsersList from './UsersList';
import UserModal from './UserModal';
import { fetchUsers, deleteUser, updateUser } from '../../actions/adminActions';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.actions.searchDocuments(term);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const searchResult = this.props.search;
    const documents = searchResult.totalItems > 0 ? searchResult : this.props.allDocuments;
    return (
      <Grid>
        {/*<Cell col={0}>
          <span />
        </Cell>*/}
        <Cell col={12}>
          <UserModal />
          <form method="post" onSubmit={this.onSubmit}>
            <span>
            <Textfield
              onChange={this.onChange}
              label="Search"
              name="search"
              floatingLabel
              value={this.state.searchTerm}
              style={{ width: '500px' }}
            />
            <IconButton raised colored name="close"
            onClick={this.clearSearch} />
            </span>
          </form>
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
    search : state.search.users || []
  };
}

export default connect(mapStateToProps,
  { fetchUsers, deleteUser, updateUser })(UsersPage);
