/** jsx */
import React, { Component } from 'react';
import { Grid, Cell, Card, CardTitle } from 'react-mdl';


class Dashboard extends Component {
  render() {
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
                <h4 style={{ marginTop: '0' }}># Users</h4>
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
                <h4 style={{ marginTop: '0' }}># Documents</h4>
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
                <h4 style={{ marginTop: '0' }}># Roles</h4>
            </CardTitle>
          </Card>
        </Cell>
      </Grid>
    );
  }
}

export default Dashboard;