/** jsx */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';
import toastr from 'toastr';
import { userLogin } from '../../actions/userActions';
import Validator from '../../utils/Validator';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }

  onSubmit(event) {
    event.preventDefault();

    const isValid = Validator.signIn(this.state.user);

    if (isValid === true) {
      this.props.userLogin(this.state.user)
      .then((token) => {
        (localStorage.setItem('jwtToken', token) &&
          this.context.router.push('/documents'))
      })
      .catch((error) => {
        toastr.error(error);
      });
    } else {
      toastr.error(isValid, 'Error', { timeOut: 3000 });
    }
  }

  render() {
    return (
      <div>
        <div>
          <span />
        </div>

        <form onSubmit={(e) => this.onSubmit(e)} className="auth-form">
          <div>
            <Textfield
              onChange={this.onChange}
              type="email"
              label="Email"
              className="form-input-email"
              name="email"
              floatingLabel
              value={this.state.user.email}
            />
          </div>
          <Textfield
            onChange={this.onChange}
            type="password"
            name="password"
            label="Password"
            className="form-input-password"
            floatingLabel
            value={this.state.user.password}
          />

          <div className="button-wrapper">
            <Button
              ripple
              className="signin-button"
              raised
              colored
              type="submit"
            >
              Sign In</Button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object
};

export default connect(null, { 
 userLogin
})(LoginForm);

export {
  LoginForm as LoginFormComponent
};
