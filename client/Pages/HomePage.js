import React, { Component } from 'react';
import docimage from '../images/docman.jpg';
import RegisterForm from '../components/RegisterForm';
import { Grid, Cell } from 'react-mdl';



class HomePage extends Component {
  render() {
    return (
        <Grid>
        <Cell col={8}>
          <div>
            <img src={require('../images/docman.jpg')} />
          </div>
        </Cell>
        <Cell col={4}>
          <RegisterForm />
        </Cell>
      </Grid>
    );
  }
}

export default HomePage;
