import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Cell,  } from 'react-mdl';
import toastr from 'toastr';
import * as roleActions from '../../actions/roleActions';
import RoleList from './RoleList';
import isAdmin from '../../utils/Utils';
import RoleModal from './RoleModal';

class RolePage extends Component {
  componentWillMount() {
    this.props.actions.fetchRoles()
    .then(() => toastr.success('Successful'))
    .catch(error => {
      toastr.error(error);
    });
  }

  render() {
    return (
      <Grid>
        {/*{isAdmin ?*/}
        <Cell col={2}>
          <span />
        </Cell>
        <Cell col={12}>
          <RoleModal />
          <p />
          <RoleList roles={this.props.roles}
          actions={this.props.actions}
          auth={this.props.auth}/>
        </Cell>
        {/*:  <h4> You are not authorized to view this page </h4>
        }*/}
      </Grid>
    );
  }
}

RolePage.propTypes = {
  roles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    roles: state.roles || [],
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RolePage);