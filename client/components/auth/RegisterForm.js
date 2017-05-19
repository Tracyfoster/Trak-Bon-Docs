/** jsx */
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
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
    this.props.registerUser(this.state.user)
    .then(() => console.log('Halleluyah!!!'))
    .catch(() => console.log('Getting better'));
  }

  render() {
    return (
      <div>
        <div>
          <p> Create an Account { this.props.loading ? 'loading' : '' } </p>
        </div>

        <form method="post" onSubmit={this.onSubmit}>
          <Textfield
            onChange={this.onChange}
            label="Firstname"
            floatingLabel
            name="firstName"
            value={this.state.user.firstname}
            style={{ width: '200px' }}
          />
          <Textfield
            onChange={this.onChange}
            label="Lastname"
            name="lastName"
            floatingLabel
            value={this.state.lasttname}
            style={{ width: '200px' }}
          />
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
          <Textfield
            onChange={this.onChange}
            type="password"
            label="Confirm Password"
            floatingLabel
            style={{ width: '200px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button
              ripple raised colored
              type="submit">
              Sign Up</Button>
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired
};

export default RegisterForm;
