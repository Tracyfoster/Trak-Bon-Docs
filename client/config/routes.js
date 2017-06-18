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
import IsAuthenticated from '../components/common/IsAuthenticated';
import IsNotAuthenticated from '../components/common/IsNotAuthenticated';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={IsNotAuthenticated(HomePage)} />
    <Route path="editor" component={IsAuthenticated(DocumentEditor)} />
    <Route path="editor/:id" component={DocumentEditor} />
    <Route path="documents" component={IsAuthenticated(DocumentPage)} />
    <Route path="dashboard" component={IsAuthenticated(DashboardPage)} />
    <Route path="manageusers" component={IsAuthenticated(UsersPage)} />
    <Route path="manageroles" component={IsAuthenticated(RolePage)} />
    <Route path="help" component={HelpPage} />
  </Route>
);
