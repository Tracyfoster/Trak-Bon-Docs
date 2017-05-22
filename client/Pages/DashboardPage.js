import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserDocuments, fetchUsers } from '../actions/adminActions';
import Dashboard from '../components/documentComponents/Dashboard';
import AdminDashboard from '../components/documentComponents/AdminDashboard';

class DashboardPage extends Component {
  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.dispatch(fetchUserDocuments(userId));
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div>
        <Grid>
          <Cell col={3}>
            <span />
          </Cell>
          <Cell col={9}>
            <div>
               { this.props.userDocuments ?
              <Dashboard
              userDocuments={this.props.userDocuments}
              auth={this.props.auth}
              />
              : <span/>
              }
            </div>
            <div>
              <span />
              <br />
            </div>
            <div>
               { this.props.users ?
              <AdminDashboard
              users={this.props.users}
              auth={this.props.auth}
              />
              : <span/>
              }
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userDocuments: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log('docpage', state.admin);
  return {
    auth: state.auth,
    userDocuments: state.admin.userDocuments.userDocuments,
    users: state.admin.users.users,
  };
};

export default connect(mapStateToProps)(DashboardPage);
