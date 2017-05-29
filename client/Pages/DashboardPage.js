import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as documentActions from '../actions/documentActions'
import Dashboard from '../components/documentComponents/Dashboard';
import AdminDashboard from '../components/documentComponents/AdminDashboard';
import { isAdmin } from '../utils/Utils';

class DashboardPage extends Component {
  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.actions.fetchUserDocuments(userId);
    this.props.actions.fetchDocuments();
  }

  render() {
    return (
      <div>
        <Grid>
          <Cell col={2}>
            <span />
          </Cell>
          <Cell col={9}>
            <div>
               { this.props.userDocuments ?
              <Dashboard
              userDocuments={this.props.userDocuments}
              auth={this.props.auth}
              actions={this.props.actions}
              />
              : <span/>
              }
            </div>
            <div>
              <span />
              <br />
            </div>
            {/*{isAdmin ?*/}
            <div>
               { this.props.allDocuments ?
              <AdminDashboard
              allDocuments={this.props.allDocuments}
              auth={this.props.auth}
              actions={this.props.actions}
              />
              : <span/>
              }
            </div>
            {/*: <span/>
            }*/}
          </Cell>
          <Cell col={1}>
            <Link to="/editor">
              <FABButton colored ripple>
                <Icon name="add" />
              </FABButton>
            </Link>
          </Cell>
        </Grid>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  userDocuments: PropTypes.object.isRequired,
  allDocuments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    auth: state.auth,
    userDocuments: state.documents.userDocuments,
    allDocuments: state.documents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
