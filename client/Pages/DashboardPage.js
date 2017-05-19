import React, { Component } from 'react';
import ActionMenu from '../components/documentComponents/ActionMenu';
import { IconButton, Textfield, Grid, Cell, List, ListItem, Icon, ListItemContent, Switch, ListItemAction, Card, CardTitle, Table, TableHeader, Menu, MenuItem} from 'react-mdl';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Cell className="side-bar" col={1}>
            <div>
              <IconButton colored name="home" />
              <span> Home </span>
            </div>
            <div>
              <IconButton colored name="drafts" />
              <span> Drafts </span>
            </div>
            <div>
              <IconButton colored name="folder" />
              <span> Folder </span>
            </div>
            <div>
              <IconButton colored name="help" />
              <span> Help </span>
            </div>
          </Cell>
          <Cell className="side-bar" col={3}>
            <List>
              <ListItem twoLine>
                <ListItemContent icon="folder" subtitle="2 document(s)">Personal Stuff</ListItemContent>
              </ListItem>
              <ListItem twoLine>
                <ListItemContent icon="folder" subtitle="6 document(s)">Andela</ListItemContent>
              </ListItem>
              <ListItem twoLine>
                <ListItemContent icon="folder" subtitle="1 document(s)">Famiz</ListItemContent>
              </ListItem>
              <ListItem twoLine>
                <ListItemContent icon="folder" subtitle="0 document(s)">Jokes</ListItemContent>
              </ListItem>
            </List>
          </Cell>
          <Cell col={8}>
            <Grid>
              <Cell col={3}>
                <Card shadow={0} style={{width: '160px', minHeight: '70px', maxHeight:'100px', background: '#3E4EB8'}}>
                  <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                      <h4 style={{marginTop: '0'}}>Total #</h4>
                  </CardTitle>
                </Card>
              </Cell>
              <Cell col={3}>
                <Card shadow={0} style={{width: '160px', minHeight: '70px', maxHeight:'100px', background: '#3E4EB8'}}>
                  <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                      <h4 style={{marginTop: '0'}}>Private #</h4>
                  </CardTitle>
                </Card>
              </Cell>
              <Cell col={3}>
                <Card shadow={0} style={{width: '160px', minHeight: '70px', maxHeight:'100px', background: '#3E4EB8'}}>
                  <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                      <h4 style={{marginTop: '0'}}>Public #</h4>
                  </CardTitle>
                </Card>
              </Cell>
              <Cell col={3}>
                <Card shadow={0} style={{width: '160px', minHeight: '70px', maxHeight:'100px', background: '#3E4EB8'}}>
                  <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                      <h4 style={{marginTop: '0'}}>Role #</h4>
                  </CardTitle>
                </Card>
              </Cell>
            </Grid>
            <h3> Hi User </h3>
            <p> Welcome to the place of awesomeness</p>

            <Table
                sortable
                shadow={0}
                rows={[
                    {username: 'John Lennon', doctitle: 'Living Ahead', docaccess: 'Role', datecreated: '05-05-2017', action: <ActionMenu id ="menu1"/>},
                    {username: 'Paul McCartney', doctitle: 'Getting started', docaccess: 'Public', datecreated: '05-05-2017', action: <ActionMenu id ="menu2"/>},
                    {username: 'George Harrison', doctitle: 'Combo jacking', docaccess: 'Public', datecreated: '03-05-2017', action: <ActionMenu id ="menu3"/>},
                    {username: 'Ringo Starr', doctitle: 'Why I refused to use Redux', docaccess: 'Role', datecreated: '02-05-2017', action: <ActionMenu id ="menu4"/>},
                    {username: 'Osas Ugbene', doctitle: 'Adamant Opposition', docaccess: 'Public', datecreated: '02-05-2017', action: <ActionMenu id ="menu5"/>}
                ]}
            >
                <TableHeader
                    name="username"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1].localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
                    tooltip="User's full names"
                >
                    Name of User
                </TableHeader>
                <TableHeader
                    name="doctitle"
                    tooltip="Title of Document"
                >
                    Document title
                </TableHeader>
                <TableHeader
                    name="docaccess"
                    tooltip="Access level on Document"
                >
                    Access level
                </TableHeader>
                <TableHeader
                    name="datecreated"
                    tooltip="Document createion date"
                >
                    Created Date
                </TableHeader>
                <TableHeader
                    name="action"
                    tooltip="Actions you can take"
                >
                    Action
                </TableHeader>
            </Table>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default DashboardPage;
