/** jsx */
import React, { Component } from 'react';
import { Table, TableHeader } from 'react-mdl';
import ActionMenu from './ActionMenu';


class DashTable extends Component {
  render() {
    return (
      <Table
        sortable
        shadow={0}
        rows={[
          { username: 'John Lennon',
            doctitle: 'Living Ahead',
            docaccess: 'Role',
            datecreated: '05-05-2017',
            action: <ActionMenu id ="menu1"/> },
          { username: 'Paul McCartney',
            doctitle: 'Getting started',
            docaccess: 'Public',
            datecreated: '05-05-2017',
            action: <ActionMenu id ="menu2"/> },
          { username: 'George Harrison',
            doctitle: 'Combo jacking',
            docaccess: 'Public',
            datecreated: '03-05-2017',
            action: <ActionMenu id ="menu3"/> },
          { username: 'Ringo Starr',
            doctitle: 'Why I refused to use Redux',
            docaccess: 'Role',
            datecreated: '02-05-2017',
            action: <ActionMenu id ="menu4"/> },
          { username: 'Osas Ugbene',
            doctitle: 'Adamant Opposition',
            docaccess: 'Public',
            datecreated: '02-05-2017',
            action: <ActionMenu id ="menu5"/> }
        ]}
    >
        <TableHeader
            name="username"
            sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1]
            .localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
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
    );
  }
}

export default DashTable;