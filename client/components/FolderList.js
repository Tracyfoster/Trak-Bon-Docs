/** jsx */
import React, { Component } from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';


class FolderList extends Component {
  render() {
    return (
      <List>
        <ListItem twoLine>
          <ListItemContent icon="folder" subtitle="2 document(s)">
            Personal Stuff
          </ListItemContent>
        </ListItem>
        <ListItem twoLine>
          <ListItemContent icon="folder" subtitle="6 document(s)">
            Andela
          </ListItemContent>
        </ListItem>
        <ListItem twoLine>
          <ListItemContent icon="folder" subtitle="1 document(s)">
            Famiz
          </ListItemContent>
        </ListItem>
        <ListItem twoLine>
          <ListItemContent icon="folder" subtitle="0 document(s)">
            Jokes
          </ListItemContent>
        </ListItem>
      </List>
    );
  }
}

export default FolderList;