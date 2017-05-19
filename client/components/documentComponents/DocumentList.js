/** jsx */
import React, { Component } from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';


export default function DocumentList({ documents, deleteDocument }) {
  const rowData = documents.map((document) => {
    return {
      id: document.id,
      userName: `${document.User.firstName} ${document.User.lastName}`,
      title: <a href=""> {document.title} </a>,
      access: document.access,
      createdAt: document.createdAt.substr(0, 10),
      action:
        <a href="" onClick={() => deleteDocument(document.id)}>Delete</a>
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

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};