/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Button, Dialog, DialogTitle, Textfield,
  DialogContent, DialogActions, IconButton } from 'react-mdl';
import { createUser } from '../../actions/userActions';

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      openDialog: false
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
    this.props.createUser(this.state.user)
      .then(() => this.handleCloseDialog())
      .catch(error => {
        toastr.error(error);
      });
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
      <div>
        <Button onClick={this.handleOpenDialog} ripple colored raised
          style={{ color: '#fff' }}>Add New User </Button>
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
                label="Firstname"
                floatingLabel
                name="firstName"
                value={this.state.user.firstName}
                required
                className="form-input-firstname"
                style={{ width: '250px' }}
              />
              <Textfield
                onChange={this.onChange}
                label="Lastname"
                name="lastName"
                floatingLabel
                value={this.state.user.lastName}
                required
                style={{ width: '250px' }}
              />
              <Textfield
                onChange={this.onChange}
                type="email"
                label="Email"
                name="email"
                className="form-input-email"
                floatingLabel
                value={this.state.user.email}
                required
                style={{ width: '250px' }}
              />
              <Textfield
                onChange={this.onChange}
                type="password"
                name="password"
                label="Password"
                floatingLabel
                value={this.state.user.password}
                required
                style={{ width: '250px' }}
              />
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                    style={{ width: '250px' }} >
                <select className="mdl-textfield__input" id="roleId" name="roleId" required
                  onChange={this.onChange}
                  value={this.state.user.roleId}>
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
              className='registration-button'
              ripple raised colored
              type="submit"
              onClick={(e) => this.onSubmit(e)}>
              Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
 }

UserModal.contextTypes = {
  router: PropTypes.object
};

UserModal.propTypes = {
  createUser: PropTypes.func.isRequired,
};

export default connect(null, {
  createUser
})(UserModal);

export {
  UserModal as UserModalComponent
}