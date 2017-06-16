import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Cell,  } from 'react-mdl';
import toastr from 'toastr';
import { fetchRoles, deleteRole, updateRole } from '../../actions/roleActions';
import RoleList from './RoleList';
import RoleModal from './RoleModal';

class RolePage extends Component {
  componentWillMount() {
    this.props.fetchRoles()
    .then()
    .catch(error => {
      toastr.error(error);
    });
  }

  render() {
    return (
      <Grid>
        <Cell col={2}>
          <span />
        </Cell>
        <Cell col={12}>
          <RoleModal />
          <p />
          <RoleList roles={this.props.roles}
          deleteRole={this.props.deleteRole}
          auth={this.props.auth}/>
        </Cell>
      </Grid>
    );
  }
}

RolePage.propTypes = {
  roles: PropTypes.array.isRequired,
  deleteRole: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roles: state.roles || [],
  auth: state.auth
});

export default connect(mapStateToProps,
{ fetchRoles, deleteRole })(RolePage);

export {
  RolePage as RolePageComponent
};