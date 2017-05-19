import React from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';

export default function UserSearch({ searchUsers }) {
  const rowData = searchUsers.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt.substr(0, 10),
    updatedAt: user.updatedAt.substr(0, 10),
  }));
  return (
    <Table
        sortable
        shadow={0}
        rows={rowData}
    >
        <TableHeader name="id">
          Id
        </TableHeader>
        <TableHeader name="firstName" >
          First Name
        </TableHeader>
        <TableHeader name="lastName">
          Last Name
        </TableHeader>
        <TableHeader name="email">
          Email
        </TableHeader>
        <TableHeader name="roleId" >
          Role
        </TableHeader>
        <TableHeader name="createdAt">
          Data Joined
        </TableHeader>
         <TableHeader name="updatedAt">
          Last Updated
        </TableHeader>
        <TableHeader name="action">
          Action
        </TableHeader>
    </Table>
  );
}

UserSearch.propTypes = {
  searchUsers: PropTypes.array.isRequired,
};
