import React, { Component } from 'react';
import { Layout, Content, } from 'react-mdl';
import NavBar from '../components/NavBar';
import FootBar from '../components/FootBar';


class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <Content>
          <div className="page-content">
            {this.props.children}
          </div>
        </Content>
        <FootBar />
      </Layout>
    );
  }
}

export default MainLayout;
