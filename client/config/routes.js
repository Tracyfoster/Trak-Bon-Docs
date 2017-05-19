/** jsx */
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory,
  browserHistory } from 'react-router';
import App from '../components/App';

import MainLayout from '../Pages/MainLayout';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import DocumentEditor from '../Pages/DocumentEditor';
import UsersPage from '../components/userComponents/UsersPage';
import ManageRoles from '../components/roleComponents/ManageRoles';
import DocumentPage from '../components/documentComponents/DocumentPage';
import FolderPage from '../components/folderComponents/FolderPage';
import SearchPage from '../components/search/SearchPage';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={HomePage} />
    <Route path="documents" component={DocumentEditor} />
    <Route path="documentlist" component={DocumentPage} />
    <Route path="folders" component={FolderPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="manageUsers" component={UsersPage} />
    <Route path="search" component={SearchPage} />
    <Route path="settings" component={UsersPage} />
    <Route path="help" component={UsersPage} />
  </Route>
);
