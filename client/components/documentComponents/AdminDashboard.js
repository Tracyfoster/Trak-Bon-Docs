/** jsx */
import React, { Component } from 'react';
import { Grid, Cell, Card, Button } from 'react-mdl';
import PropTypes from 'prop-types';
import UsersList from '../../components/userComponents/UsersList';

export default function AdminDashboard({ users, auth }) {
  console.log('userDocuments', users)
  const allUsers = users.data;
  const adminCount = users.adminCount.length;
  const reviewersCount = users.reviewersCount.length;
  const writersCount = users.writersCount.length;
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
                  # Admin
                  <span /> {adminCount}
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
                  # Reviwers
                  <span /> {reviewersCount}
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
                  # Writers
                  <span /> {writersCount}
              </Button>
          </span>
        </div>
        <div>
          <span />
        </div>
        <div>
          <div>
          <h4>Recently added Users </h4>
          <Button
              ripple raised colored
              type="submit">
              View All</Button>
          </div>
          { allUsers ?
          <UsersList
            allUsers={allUsers}
            auth={auth}
          />
          : <span/>
          }
        </div>
      </div>
  );
}

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};
