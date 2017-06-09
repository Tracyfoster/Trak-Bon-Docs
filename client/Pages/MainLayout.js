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
        <div className="content">
            {this.props.children}
            <div style={{clear:"both", height:"50px"}} />
        </div>
        <FootBar />
      </Layout>
    );
  }
}


export default MainLayout;