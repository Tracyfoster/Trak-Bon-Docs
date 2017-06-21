/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';
import toastr from 'toastr';
import { registerUser } from '../../actions/userActions';
import Validator from '../../utils/Validator';


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    user.roleId = 2;
    this.setState({ user });
  }

  onSubmit(event) {
    event.preventDefault();

    const isValid = Validator.signUp(this.state.user);

    if (isValid === true) {
      this.props.registerUser(this.state.user)
      .then((token) => {
        (localStorage.setItem('jwtToken', token) &&
          this.context.router.push('/documents'))
      })
      .catch((error) => {
        toastr.error(error);
      });
    } else {
      toastr.error(isValid, 'Error', { timeOut: 10000000 });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)} className="auth-form">
          <Textfield
            onChange={this.onChange}
            label="Firstname"
            floatingLabel
            name="firstName"
            className="form-input-firstName"
            value={this.state.user.firstName}
            style={{ width: '150px' }}
          />
          <Textfield
            onChange={this.onChange}
            label="Lastname"
            name="lastName"
            floatingLabel
            className="form-input-lastName"
            value={this.state.user.lastName}
            style={{ width: '150px' }}
          />
          <Textfield
            onChange={this.onChange}
            type="email"
            label="Email"
            name="email"
            floatingLabel
            className="form-input-email"
            value={this.state.user.email}
            style={{ width: '150px' }}
          />
          <Textfield
            onChange={this.onChange}
            type="password"
            name="password"
            label="Password"
            floatingLabel
            className="form-input-password"
            value={this.state.user.password}
            style={{ width: '150px' }}
          />
          <Textfield
            onChange={this.onChange}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            floatingLabel
            className="form-input-confirmPassword"
            value={this.state.user.confirmPassword}
            style={{ width: '150px' }}
          />
          <div className="button-wrapper">
            <Button
              ripple
              className="signup-button"
              raised
              colored
              type="submit"
            >
              Sign Up</Button>
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.contextTypes = {
  router: PropTypes.object
};

export default connect(null, { 
  registerUser
})(RegisterForm);

export {
  RegisterForm as RegisterFormComponent
};
