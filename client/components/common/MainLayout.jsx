import React, { Component } from 'react';
import { Layout } from 'react-mdl';

import NavBar from '../common/NavBar';
import DrawerBar from '../common/DrawerBar';


class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <DrawerBar />
        <div className="content">
          {this.props.children}
        </div>
      </Layout>
    );
  }
}


export default MainLayout;
