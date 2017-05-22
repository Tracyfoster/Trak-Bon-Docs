import React from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';

export default function UserSearch({ userResults }) {
  const rowData = userResults.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    count: user.userDocuments.length,
    action: <a href="">Delete </a>
  }));
  return (
    <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={rowData}
    >
        <TableHeader name="firstName" >
          First Name
        </TableHeader>
        <TableHeader name="lastName">
          Last Name
        </TableHeader>
        <TableHeader name="email">
          Email
        </TableHeader>
        <TableHeader numeric name="count" >
          # Documents Created
        </TableHeader>
        <TableHeader name="action">
          Action
        </TableHeader>
    </Table>
  );
}

UserSearch.propTypes = {
  userResults: PropTypes.array.isRequired,
};
