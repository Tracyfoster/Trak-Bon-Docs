import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import { Layout, Content, } from 'react-mdl';



class MainLayout extends Component {
  render() {
    return (
      <Layout>
        <NavBar />
        <Content>
          <div className="page-content">
            <HomePage />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default MainLayout;
