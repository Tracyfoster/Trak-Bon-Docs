import React, { Component } from 'react';
import { Layout } from 'react-mdl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import NavBar from '../common/NavBar';
import DrawerBar from '../common/DrawerBar';


const MainLayout = (props) => (
  <Layout>
    <NavBar />
    <DrawerBar />  
    <div className="content">
      {props.children}
    </div>
  </Layout>
);

export default MainLayout;

