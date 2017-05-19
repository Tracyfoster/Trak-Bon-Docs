import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemContent } from 'react-mdl';
import { fetchFolders, deleteFolder } from '../../actions/folderActions';

class FolderPage extends Component {
  componentDidMount() {
    this.props.fetchFolders();
  }

  render() {
    const data = this.props.folders.map((folder) => {
      return (
          <ListItem twoLine key={folder.id}>
            <ListItemContent
              icon="folder"
              subtitle="2 document(s)"
              name="folderName"
            >
              {folder.folderName}
            </ListItemContent>
          </ListItem>
      );
    });
    return (
      <div>
        <h3>Folders List</h3>
        <List>
          {data}
        </List>
      </div>
    );
  }
}

FolderPage.propTypes = {
  folders: PropTypes.array.isRequired,
  fetchFolders: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
}

export default connect(mapStateToProps,
{ fetchFolders, deleteFolder })(FolderPage);