/** jsx */
import React, { Component } from 'react';
import MainLayout from '../Pages/MainLayout';
import HomePage from '../Pages/HomePage';
import AdminPage from '../Pages/AdminPage';

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout> <AdminPage /></MainLayout>
      </div>
    );
  }
}

export default App;
