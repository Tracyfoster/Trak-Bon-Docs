/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, Textfield,
  DialogContent, DialogActions, IconButton } from 'react-mdl';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
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
    this.props.userLogin(this.state.user)
    .then(() => this.context.router.push('/manageusers'))
    .catch(() => console.log('Getting better'));
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
        <Button onClick={this.handleOpenDialog} ripple
          style={{ color: '#fff' }}>Sign In</Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
          <IconButton raised colored name="close"
            onClick={this.handleCloseDialog} />
          <DialogTitle>SIGN IN </DialogTitle>
          <DialogContent>
            <form>
              <Textfield
                onChange={this.onChange}
                type="email"
                label="Email"
                name="email"
                floatingLabel
                value={this.state.email}
                style={{ width: '200px' }}
              />
              <Textfield
                onChange={this.onChange}
                type="password"
                name="password"
                label="Password"
                floatingLabel
                value={this.state.password}
                style={{ width: '200px' }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              ripple raised colored
              type="submit"
              onClick={this.onSubmit}>
              Sign In</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
 }

LoginForm.contextTypes = {
  router: PropTypes.object
};

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired
};

export default LoginForm;