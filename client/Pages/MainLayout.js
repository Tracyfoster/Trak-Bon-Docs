import React, { Component } from 'react';
import { Layout, Content, Grid, Cell } from 'react-mdl';

import NavBar from '../components/common/NavBar';
import FootBar from '../components/common/FootBar';
import DrawerBar from '../components/common/DrawerBar';


class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <DrawerBar />
          <Grid>
              {this.props.children}
          </Grid>
        <FootBar />
      </Layout>
    );
  }
}


export default MainLayout;