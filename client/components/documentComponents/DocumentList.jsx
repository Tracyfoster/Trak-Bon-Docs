/** jsx */
import React from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentView from './DocumentView';

const DocumentList = (props) => {
  const rowData = props.documents.map((document) => {
    const username = (document.User && `${document.User.firstName} ${document.User.lastName}`);
    return {
      id: document.id,
      title: document.title,
      access: document.access,
      username,
      createdAt: document.createdAt.substr(0, 10),
      action: <DocumentView document={document} auth={props.auth}/>
    };
  });

  return (
    <div>
      <Table
        sortable
        shadow={0}
        rows={rowData}
        className="dashboard-table"
      >
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
          name="username"
          tooltip="Document creation user"
        >
            Created By
        </TableHeader>
        <TableHeader
          name="createdAt"
          tooltip="Document creation date"
        >
            Published Date
        </TableHeader>
        <TableHeader
          name="action"
          tooltip="Actions you can take"
        >
            Action
        </TableHeader>
      </Table>
    </div>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

DocumentList.defaultProps = {
  auth: {}
}
export default DocumentList;
