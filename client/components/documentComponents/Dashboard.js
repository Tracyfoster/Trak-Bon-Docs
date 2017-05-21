/** jsx */
import React, { Component } from 'react';
import { Grid, Cell, Card, Button } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentList from '../../components/documentComponents/DocumentList';

export default function Dashboard({ userDocuments, auth }) {
  const documents = userDocuments.data;
  const publicCount = userDocuments.public.length;
  const privateCount = userDocuments.private.length;
  const roleCount = userDocuments.role.length;
  return (
      <div>
        <div>
          <span>
              <Button
                raised
                colored
                style={{
                  textAlign: 'center',
                  width: '150px',
                  color: '#fff' }}>
                  # Public
                  <span /> {publicCount}
              </Button>
          <span />
          <span />
              <Button
                raised
                colored
                style={{
                  textAlign: 'center',
                  width: '150px',
                  color: '#fff' }}>
                  # Private
                  <span /> {privateCount}
              </Button>
          <span />
          <span />
              <Button
                raised
                colored
                style={{
                  textAlign: 'center',
                  width: '150px',
                  color: '#fff' }}>
                  # Role
                  <span /> {roleCount}
              </Button>
          </span>
        </div>
        <h3> Hi User </h3>
        <p> Welcome to the place of awesomeness</p>
        <div>
          <div>
          <h4>Documents List</h4>
          <Button
              ripple raised colored
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
};
