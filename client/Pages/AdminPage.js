import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import ActionMenu from '../components/documentComponents/ActionMenu';
import FolderPage from '../components/folderComponents/FolderPage';
import Dashboard from '../components/documentComponents/Dashboard';
import DocumentPage from '../components/documentComponents/DocumentPage';
import Editor from '../components/documentComponents/Editor';


class AdminPage extends Component {
  render() {
    return (
      <div>
        <Grid >
          <Cell className="side-bar" col={4}>
            <FolderPage />
          </Cell>
          <Cell col={8}>
            <Dashboard />
            <p> Welcome to the place of awesomeness</p>
            <DocumentPage />
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default AdminPage;
/*
<Editor placeholder={'Write something...'}
              style={{ height: '200px', padding: '300px' }}
              />*/