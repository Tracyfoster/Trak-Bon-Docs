/** jsx */
import React, { Component } from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';


export default function DocumentSearch({ documentResults }) {
  const rowData = documentResults.map((result) => {
    return {
      id: result.id,
      userName: `${result.User.firstName} ${result.User.lastName}`,
      title: <a href=""> {result.title} </a>,
      access: result.access,
      createdAt: result.createdAt.substr(0, 10),
    };
  });

  return (
      <Table
      sortable
      shadow={0}
      rows={rowData}
  >
      <TableHeader
          name="userName"
          sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1]
          .localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
          tooltip="User's full names"
      >
          Name of User
      </TableHeader>
      <TableHeader
          name="title"
          tooltip="Title of Document"
      >
          Document title
      </TableHeader>
      <TableHeader
          name="access"
          tooltip="Access level on Document"
      >
          Access level
      </TableHeader>
      <TableHeader
          name="createdAt"
          tooltip="Document createion date"
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
}

DocumentSearch.propTypes = {
  documentResults: PropTypes.array.isRequired,
};