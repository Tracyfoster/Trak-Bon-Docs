import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Grid, Cell, Button, Textfield, Icon } from 'react-mdl';
import UsersList from './UsersList';
import UserModal from './UserModal';
import { fetchUsers, deleteUser, updateUser } from '../../actions/adminActions';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      users: [...props.allUsers]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.allUsers !== nextProps.allUsers) {
        const users = nextProps.search.totalItems > 0 ?
          nextProps.search.data : nextProps.allUsers;

      this.setState({ users: [...users] });
    }
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.actions.searchUsers(term)
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      users: [...this.props.allUsers]
    });
  }

  componentDidMount() {
    this.props.fetchUsers()
    .then(() => toastr.success('Successful'))
    .catch(error => {
      toastr.error(error);
    });
  }

  render() {
    const users = this.state.users;
    return (
      <Grid>
        <Cell col={2}>
          <span />
        </Cell>
        <Cell col={10}>
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
            <Icon name="close"
            onClick={this.clearSearch} />
            </span>
          </form>
          <h3>Users List</h3>
          <UsersList
            allUsers={users}
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
