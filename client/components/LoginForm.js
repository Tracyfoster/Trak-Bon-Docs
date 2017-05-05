/** jsx */
import React, { Component } from 'react';
const createUser = require('../actions/loginPage')
import { Button, Dialog, DialogTitle,Textfield, DialogContent, DialogActions} from 'react-mdl';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
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
        <Button onClick={this.handleOpenDialog} ripple style={{color:"#fff"}}>Sign In</Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
          <DialogTitle>SIGN IN</DialogTitle>
          <DialogContent>
            <Textfield
              onChange={() => {}}
              type="email"
              label="Email"
              floatingLabel
              style={{width: '200px'}}
            />
            <Textfield
              onChange={() => {}}
              type="password"
              label="Password"
              floatingLabel
              style={{width: '200px'}}
            />
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog}>Sign In</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
 }
