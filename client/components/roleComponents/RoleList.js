import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHeader, IconButton } from 'react-mdl';
import { fetchRoles, deleteRole, } from '../../actions/roleActions';
import RoleModal from './RoleModal';


export default function RoleList({ roles, actions, auth }) {
  const rowData = roles.map((role) => ({
      id: role.id,
      roleName: role.roleName,
      count: role.Users.length,
      createdAt: role.createdAt.substr(0, 10),
      action:
        <span>
          <IconButton colored name= "delete" onClick={() => actions.deleteRole(role.id)} /> |
          <RoleModal role={role} />
        </span>
  }));
  return (
    <Table
    sortable
    shadow={0}
    rows={rowData}
>
    <TableHeader
        name="roleName"
        sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1]
        .localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
        tooltip="Role Name" >
        Role Name
    </TableHeader>
    <TableHeader
        name="count"
        tooltip="Number of Users" >
        Number of Users
    </TableHeader>
    <TableHeader
        name="createdAt"
        tooltip="Document creation date" >
        Created Date
    </TableHeader>
    <TableHeader
        name="action"
        tooltip="Actions you can take" >
        Action
    </TableHeader>
  </Table>
  );
}

RoleList.propTypes = {
  roles: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}