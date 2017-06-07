/** jsx */
import React, { Component } from 'react';
import { Grid, Cell, Card, Button } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentList from '../../components/documentComponents/DocumentList';

export default function Dashboard({ userDocuments, auth, actions }) {
  console.log('userDocuments', userDocuments)
  const documents = userDocuments.data;
  const publicCount = (documents.filter(document => document.access === 'public')).length;
  const privateCount = (documents.filter(document => document.access === 'private')).length;
  const roleCount = (documents.filter(document => document.access === 'role')).length;

  return (
      <div>
        <div>
          <span>
              <Button
                raised
                colored
                style={{
                  width: '150px',
                  marginRight: '10px' }}>
                  # Public
                  <span /> {publicCount}
              </Button>
          <span />
          <span />
              <Button
                raised
                colored
                style={{
                  width: '150px',
                  marginRight: '10px' }}>
                  # Private
                  <span /> {privateCount}
              </Button>
          <span />
          <span />
              <Button
                raised
                colored
                style={{
                  width: '150px',
                  marginRight: '10px' }}>
                  # Role
                  <span /> {roleCount}
              </Button>
          </span>
        </div>

        <div>
          <div>
          <h4>My Documents</h4>
          <Button
              ripple raised colored
              style={{marginBottom: '5px'}}
              type="submit">
              View All</Button>
          </div>
          { documents ?
          <DocumentList
            documents={documents}
          />
          : <span/>
          }
        </div>
      </div>
  );
}

Dashboard.propTypes = {
  userDocuments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
