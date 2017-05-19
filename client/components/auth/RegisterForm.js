/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';
import { registerUser } from '../../actions/userActions';


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
    this.props.dispatch(registerUser(this.state.user))
    .then(() => this.context.router.push('/dashboard'))
    .catch(error => console.log('Getting better', error));
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

RegisterForm.contextTypes = {
  router: PropTypes.object
};

RegisterForm.PropTypes = {
  dispatch: PropTypes.func.isRquired,
};

export default connect()(RegisterForm);
