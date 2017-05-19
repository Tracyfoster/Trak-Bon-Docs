import React, { Component, PropTypes } from 'react';
import { IconButton, Menu, MenuItem} from 'react-mdl';

class ActionMenu extends Component {
  render () {
    return (
      <div style={{position: 'relative'}}>
        <IconButton name="more_vert" id={this.props.id} />
        <Menu target={this.props.id} align="right">
          <MenuItem>Read</MenuItem>
          <MenuItem disabled>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  id: PropTypes.string.isRequired
};

export default ActionMenu;