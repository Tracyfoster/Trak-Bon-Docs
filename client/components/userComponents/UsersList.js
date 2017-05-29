import React from 'react';
import { Table, TableHeader, IconButton } from 'react-mdl';
import PropTypes from 'prop-types';
import UserUpdate from './UserUpdate';

export default function UsersList({ allUsers, deleteUser, auth, context }) {
  console.log('allUsers', allUsers);
  const users = allUsers;
  const userUpdate = (id) => {
    context.push(`/manageusers/${id}`);
  };

  const rowData = users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt.substr(0, 10),
    updatedAt: user.updatedAt.substr(0, 10),
    action:
      <span>
        <IconButton colored name= "delete" onClick={() => deleteUser(user.id)} /> |
        <UserUpdate user={user} />
      </span>
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

UsersList.propTypes = {
  allUsers: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired
};
