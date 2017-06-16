/** jsx */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainLayout from '../components/common/MainLayout';
import HomePage from '../components/common/HomePage';
import DashboardPage from '../components/documentComponents/DashboardPage';
import DocumentEditor from '../components/documentComponents/DocumentEditor';
import HelpPage from '../components/common/HelpPage';
import UsersPage from '../components/userComponents/UsersPage';
import RolePage from '../components/roleComponents/RolePage';
import DocumentPage from '../components/documentComponents/DocumentPage';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={HomePage} />
    <Route path="editor" component={DocumentEditor} />
    <Route path="editor/:id" component={DocumentEditor} />
    <Route path="documents" component={DocumentPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="manageusers" component={UsersPage} />
    <Route path="manageroles" component={RolePage} />
    <Route path="help" component={HelpPage} />
  </Route>
);
