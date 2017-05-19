/** jsx */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';
import { userLogin } from '../../actions/userActions';

class LoginForm extends Component {
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
    this.props.dispatch(userLogin(this.state.user))
    .then(() => this.context.router.push('/dashboard'))
    .catch(() => console.log('Getting better'));
  }

  render() {
    return (
      <div>
        <div>
          <span />
        </div>

        <form method="post" onSubmit={this.onSubmit}>

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

LoginForm.contextTypes = {
  router: PropTypes.object
};

LoginForm.PropTypes = {
  dispatch: PropTypes.func.isRquired,
};

export default connect()(LoginForm);

