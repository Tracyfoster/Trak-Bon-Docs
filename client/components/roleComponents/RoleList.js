import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHeader, IconButton } from 'react-mdl';
import RoleModal from './RoleModal';


const RoleList = ({ roles, deleteRole }) => {
  const rowData = roles.map(role => ({
    id: role.id,
    roleName: role.roleName,
    count: role.Users ? role.Users.length : 0,
    createdAt: role.createdAt.substr(0, 10),
    action:
  <span>
    <IconButton
      colored
      name="delete"
      className="delete-button"
      onClick={() => deleteRole(role.id)}
    /> |
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
        tooltip="Role Name"
      >
        Role Name
      </TableHeader>
      <TableHeader
        name="count"
        tooltip="Number of Users"
      >
        Number of Users
      </TableHeader>
      <TableHeader
        name="createdAt"
        tooltip="Document creation date"
      >
        Created Date
      </TableHeader>
      <TableHeader
        name="action"
        tooltip="Actions you can take"
      >
        Action
      </TableHeader>
    </Table>
  );
};

RoleList.propTypes = {
  roles: PropTypes.array.isRequired,
  deleteRole: PropTypes.func.isRequired,
};

export default RoleList;
