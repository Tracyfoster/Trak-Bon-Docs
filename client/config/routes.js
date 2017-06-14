/** jsx */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainLayout from '../Pages/MainLayout';
import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import DocumentEditor from '../Pages/DocumentEditor';
import HelpPage from '../components/common/HelpPage';
import UsersPage from '../components/userComponents/UsersPage';
import ManageRoles from '../components/roleComponents/ManageRoles';
import DocumentPage from '../components/documentComponents/DocumentPage';
import SearchPage from '../components/search/SearchPage';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={HomePage} />
    <Route path="editor" component={DocumentEditor} />
    <Route path="editor/:id" component={DocumentEditor} />
    <Route path="documents" component={DocumentPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="manageusers" component={UsersPage} />
    <Route path="manageroles" component={ManageRoles} />
    <Route path="search/:searchTerm" component={SearchPage} />
    <Route path="help" component={HelpPage} />
  </Route>
);
