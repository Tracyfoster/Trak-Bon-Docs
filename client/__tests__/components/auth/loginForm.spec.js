import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Validator from '../../../utils/Validator.js';
import {
  LoginFormComponent as LoginForm
} from '../../../components/auth/LoginForm';

describe('Auth Components', () => {
  const props = {
    userLogin: sinon.spy(() => new Promise(() => {}))
  };

  describe('LoginForm container component', () => {
    const component = shallow(
      <LoginForm {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('should change state via onChange method', () => {
      expect(component.state().user).toEqual({ email: '', password: ''});

      component.instance().onChange({
        target: {
          name: 'email',
          value: 'john@gmail.com'
        }
      });
      component.instance().onChange({
        target: {
          name: 'password',
          value: 'johny123'
        }
      })

      expect(typeof component.state().user).toBe('object');
      expect(component.state().user.email).toBe('john@gmail.com');
      expect(component.state().user.password).toBe('johny123');
    });

    it('button calls onSubmit', () => {
      const component = shallow(
        <LoginForm {...props} />
      );

      const onSubmitStub = sinon.stub(component.instance(), 'onSubmit');
      const form = component.find('form');

      form.simulate('submit', { preventDefault: ()=> {} });

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(onSubmitStub.callCount).toEqual(1);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });

     it('onSubmit calls userLogin action', () => {

      const component = shallow(
        <LoginForm {...props} />
      );

      component.setState({
        user: {
          email: 'test@email.com',
          password: 'password'
        }
      });

      component.instance().onSubmit({ preventDefault: () => {}});

      expect(props.userLogin.calledOnce).toEqual(true);
      expect(props.userLogin.callCount).toEqual(1);
      expect(typeof props.userLogin.args[0]).toEqual('object');
      expect(props.userLogin.args[0][0].email).toEqual('test@email.com');
      expect(props.userLogin.args[0][0].password).toEqual('password');
    });

    it('update input fields on state change', () => {

      const component = shallow(
        <LoginForm {...props} />
      );

      expect(component.state().user).toEqual({email: '', password: ''});

      component.instance().onChange({
        target: {
          name: 'email',
          value: 'john@email.com'
        }
      });
      component.instance().onChange({
        target: {
          name: 'password',
          value: 'johny123'
        }
      });
      const emailInput = component.find('.form-input-email');
      const passwordInput = component.find('.form-input-password');

      expect(emailInput.props().value).toEqual('john@email.com');
      expect(passwordInput.props().value).toEqual('johny123');
    });
  });
});