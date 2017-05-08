/** jsx */
import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl';


class RegisterForm extends Component {
  render() {
    return (
      <div>
        <div>
          <p> Create an Account </p>
        </div>

        <form action="#">
          <Textfield
            onChange={() => {}}
            label="Firstname"
            floatingLabel
            style={{ width: '200px' }}
          />
          <Textfield
            onChange={() => {}}
            label="Lastname"
            floatingLabel
            style={{ width: '200px' }}
          />
          <Textfield
            onChange={() => {}}
            type="email"
            label="Email"
            floatingLabel
            style={{ width: '200px' }}
          />
          <Textfield
            onChange={() => {}}
            type="passwor"
            label="Password"
            floatingLabel
            style={{ width: '200px' }}
          />
          <Textfield
            onChange={() => {}}
            type="password"
            label="Confirm Password"
            floatingLabel
            style={{ width: '200px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button ripple colored>Sign In</Button>
          </div>
        </form>
        <div>
          <p> Already have an account?
          <span><a href="#"> Sign In </a></span>
           </p>
        </div>
      </div>
    );
  }
}

export default RegisterForm;