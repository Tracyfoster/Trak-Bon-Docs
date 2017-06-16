import React, { Component } from 'react';
import { Layout } from 'react-mdl';

import NavBar from '../common/NavBar';
import FootBar from '../common/FootBar';
import DrawerBar from '../common/DrawerBar';


class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <DrawerBar />
        <div className="content">
          {this.props.children}
          <div style={{ clear: 'both', height: '50px' }} />
        </div>
        <FootBar />
      </Layout>
    );
  }
}


export default MainLayout;
