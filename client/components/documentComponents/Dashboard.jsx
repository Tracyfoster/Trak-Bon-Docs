/** jsx */
import React from 'react';
import { Button } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentList from '../../components/documentComponents/DocumentList';

const Dashboard = (props) => {
  const documents = props.allDocuments.data;
  const publicCount = (documents.filter(document =>
    document.access === 'public')).length;
  const privateCount = (documents.filter(document =>
    document.access === 'private')).length;
  const roleCount = (documents.filter(document =>
    document.access === 'role')).length;
  return (
    <div>
      <div>
        <span>
          <Button
            raised
            className="button"
            colored
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
            # Public
            <span /> {publicCount}
          </Button>
          <span />
          <span />
          <Button
            raised
            colored
            className="button"
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
            # Private
            <span /> {privateCount}
          </Button>
          <span />
          <span />
          <Button
            raised
            colored
            className="button"
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
              # Role
              <span /> {roleCount}
          </Button>
        </span>
      </div>
      <p />
      <div>
        <div>
          <h4 className="my-document-header">All Documents</h4>
        </div>
        { documents.length > 0 ?
          <DocumentList
            documents={documents}
            auth={props.auth}
          />
          : <p className="no-document-p">No documents yet</p>
          }
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  allDocuments: PropTypes.object.isRequired,
};

export default Dashboard;
