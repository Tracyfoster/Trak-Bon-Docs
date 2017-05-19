/** jsx */
import React, { Component } from 'react';
import { Grid, Cell, Card, CardTitle } from 'react-mdl';
import PropTypes from 'prop-types';

export default function Dashboard({ dashboard }) {
  console.log(dashboard);
  return (
    <Grid>
      <Cell col={4}>
        <Card
          shadow={0}
          style={{
            width: '200px',
            minHeight: '70px',
            maxHeight: '100px',
            background: '#3E4EB8' }}>
          <CardTitle
            expand
            style={{
              alignItems: 'flex-start',
              color: '#fff' }}>
              <h4 style={{ marginTop: '0' }}># Public
              <br /> {dashboard[0]} </h4>
          </CardTitle>
        </Card>
      </Cell>
      <Cell col={4}>
        <Card
          shadow={0}
          style={{
            width: '200px',
            minHeight: '70px',
            maxHeight: '100px',
            background: '#3E4EB8' }}>
          <CardTitle
            expand
            style={{
              alignItems: 'flex-start',
              color: '#fff' }}>
              <h4 style={{ marginTop: '0' }}># Private
              <br /> {dashboard[1]} </h4>
          </CardTitle>
        </Card>
      </Cell>
      <Cell col={4}>
        <Card
          shadow={0}
          style={{
            width: '200px',
            minHeight: '70px',
            maxHeight: '100px',
            background: '#3E4EB8' }}>
          <CardTitle
            expand
            style={{
              alignItems: 'flex-start',
              color: '#fff' }}>
              <h4 style={{ marginTop: '0' }}># Role
              <br /> {dashboard[2]} </h4>
          </CardTitle>
        </Card>
      </Cell>
    </Grid>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.array.isRequired,
};