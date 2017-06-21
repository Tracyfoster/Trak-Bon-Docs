import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Validator from '../../../utils/Validator';
import {
  RegisterFormComponent as RegisterForm
} from '../../../components/auth/RegisterForm';

describe('Auth Components', () => {
  const props = {
    registerUser: sinon.spy(() => new Promise(() => {}))
  };

  describe('RegisterForm container component', () => {
    const component = shallow(
      <RegisterForm {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('should change state via onChange method', () => {
      const data = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      expect(component.state().user).toEqual(data);

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
        <RegisterForm {...props} />
      );

      const onSubmitStub = sinon.stub(component.instance(), 'onSubmit');
      const form = component.find('form');

      form.simulate('submit', { preventDefault: ()=> {} });

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(onSubmitStub.callCount).toEqual(1);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });

    it('onSubmit calls registerUser action', () => {

      const component = shallow(
        <RegisterForm {...props} />
      );
      component.setState({
        user: {
          firstName: 'Test',
          lastName: 'When',
          email: 'test@email.com',
          password: 'password',
          confirmPassword: 'password'
        }
      });

      component.instance().onSubmit({ preventDefault: () => {}} );

      expect(props.registerUser.calledOnce).toEqual(true);
      expect(props.registerUser.callCount).toEqual(1);
      expect(typeof props.registerUser.args[0]).toEqual('object');
    });

    it('update input fields on state change', () => {
      const props = {
        registerUser: sinon.spy(() => new Promise(() => {}))
      };

      const component = shallow(
        <RegisterForm {...props} />
      );
      const data = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      expect(component.state().user).toEqual(data);
      
      component.instance().onChange({
        target: {
          name: 'firstName',
          value: 'John'
        }
      });
      component.instance().onChange({
        target: {
          name: 'lastName',
          value: 'Ovie'
        }
      });
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
      component.instance().onChange({
        target: {
          name: 'confirmPassword',
          value: 'johny123'
        }
      });
      const firstNameInput = component.find('.form-input-firstName');
      const lastNameInput = component.find('.form-input-lastName');
      const emailInput = component.find('.form-input-email');
      const passwordInput = component.find('.form-input-password');
      const confirmPasswordInput = component.find('.form-input-confirmPassword');

      expect(firstNameInput.props().value).toEqual('John');
      expect(lastNameInput.props().value).toEqual('Ovie');
      expect(emailInput.props().value).toEqual('john@email.com');
      expect(passwordInput.props().value).toEqual('johny123');
      expect(confirmPasswordInput.props().value).toEqual('johny123');
    });
  });
});