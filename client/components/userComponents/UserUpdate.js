/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, Textfield,
  DialogContent, DialogActions, IconButton } from 'react-mdl';
import { updateUser } from '../../actions/userActions';
import { isAdmin } from '../../utils/Utils';

class UserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: this.props.user.id,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        roleId: this.props.user.roleId,
        password: this.props.user.password,
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('usertoupdate', this.state.user);
    this.props.dispatch(updateUser(this.state.user))
    .then(() => this.handleCloseDialog())
    .catch(error => console.log('Getting better', error));
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
        <IconButton colored name= "mode_edit"
        onClick={this.handleOpenDialog}
         >
          Add New User
        </IconButton>
        <Dialog
          open={this.state.openDialog}
          onCancel={this.handleCloseDialog}
          style={{ width: '450px' }}>
          <IconButton raised colored name="close"
            onClick={this.handleCloseDialog} />
          <DialogContent>
            <form method="post" onSubmit={this.onSubmit}>
              <Textfield
                onChange={this.onChange}
                disabled={!isAdmin}
                label="Firstname"
                floatingLabel
                name="firstName"
                value={this.state.user.firstName}
                style={{ width: '200px' }}
              />
              <div />
              <Textfield
                onChange={this.onChange}
                disabled={!isAdmin}
                label="Lastname"
                name="lastName"
                floatingLabel
                value={this.state.user.lastName}
                style={{ width: '200px' }}
              />
              <div />
              <Textfield
                onChange={this.onChange}
                disabled={!isAdmin}
                type="email"
                label="Email"
                name="email"
                floatingLabel
                value={this.state.user.email}
                style={{ width: '200px' }}
              />
              <div />
              <Textfield
                onChange={this.onChange}
                disabled={!isAdmin}
                type="password"
                name="password"
                label="Put your Password to update"
                floatingLabel
                value={this.state.user.password}
                style={{ width: '200px' }}
              />
              <div />
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder"
                    style={{ width: '250px' }} >
                <select className="mdl-textfield__input" id="roleId" name="roleId"
                  onChange={this.onChange}
                  value={this.state.user.roleId || ''}>
                  <option value="1">Admin</option>
                  <option value="2">Reviewers</option>
                  <option value="3">Writers</option>
                </select>
                <label className="mdl-textfield__label"
                       htmlFor="roleId">Role</label>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              ripple raised colored
              type="submit"
              onClick={this.onSubmit}>
              Update</Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
 }

UserUpdate.contextTypes = {
  router: PropTypes.object
};

UserUpdate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect()(UserUpdate);