/** jsx */
import React from 'react';
import { Button } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentList from '../../components/documentComponents/DocumentList';

const UserDocuments = (props) => {
  const documents = props.userDocuments.data;
  const publicCount = (documents.filter(document => document.access === 'public')).length;
  const privateCount = (documents.filter(document => document.access === 'private')).length;
  const roleCount = (documents.filter(document => document.access === 'role')).length;

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
            className="button"
            colored
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
            className="button"
            colored
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
              # Role
              <span /> {roleCount}
          </Button>
        </span>
      </div>

      <div>
        <div>
          <h4 className="my-document-header">{ props.userDocuments.pageHeader || 'My Documents' }</h4>
        </div>
        { documents.length > 0 ?
          <DocumentList
            documents={documents}
            auth={props.auth}
          />
        : <p className="no-document-p">You have no documents yet</p>
        }
      </div>
    </div>
  );
};

UserDocuments.propTypes = {
  userDocuments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

UserDocuments.defaultProps = {
  auth: {}
}

export default UserDocuments;
