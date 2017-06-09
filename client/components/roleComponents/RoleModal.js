/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, Textfield,
  DialogContent, DialogActions, IconButton } from 'react-mdl';
import { createRole, updateRole } from '../../actions/roleActions';
import { isAdmin } from '../../utils/Utils';

class RoleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: {
        roleName: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const role = this.state.role;
    role[field] = event.target.value;
    this.setState({ role });
  }

  componentWillMount() {
    if (this.props.role)
    this.setState({
      role: {
        id: this.props.role.id,
        roleName: this.props.role.roleName,
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.role.id) {
      this.props.dispatch(updateRole(this.state.role))
      .then(() => this.handleCloseDialog())
      .catch(error => console.log('Getting better', error));
    } else {
      this.props.dispatch(createRole(this.state.role))
      .then(() => this.handleCloseDialog())
      .catch(error => console.log('Getting better', error));
    }
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render() {
    return (
      <span>
        {this.state.role.id ?
          <IconButton colored name= "mode_edit"
          onClick={this.handleOpenDialog}
          >
          Edit Role
          </IconButton>
        :
        <Button onClick={this.handleOpenDialog} ripple colored raised
          style={{ color: '#fff' }}>Add New Role </Button>
        }

        <Dialog
          open={this.state.openDialog}
          onCancel={this.handleCloseDialog}
          style={{ width: '250px' }}>
          <IconButton raised colored name="close"
            onClick={this.handleCloseDialog} />
          <DialogContent>
            <form method="post" onSubmit={this.onSubmit}>
              <Textfield
                onChange={this.onChange}
                disabled={!isAdmin}
                label="Rolename"
                floatingLabel
                name="roleName"
                value={this.state.role.roleName}
                required
                style={{ width: '200px' }}
              />
              <div />


            </form>
          </DialogContent>
          <DialogActions>
            <Button
              ripple raised colored
              type="submit"
              onClick={this.onSubmit}>
              Save</Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
 }

RoleModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  role: PropTypes.object
}

export default connect()(RoleModal);