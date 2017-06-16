import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  UserModalComponent as UserModal
} from '../../../components/userComponents/UserModal';

describe('userComponent', () => {
  const props = {
    createUser: sinon.spy(() => new Promise(() => {}))
  };

  describe('UserModal container component', () => {
    const component = shallow(
      <UserModal {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('should change state via onChange method', () => {
      expect(component.state().user).toEqual({});

      component.instance().onChange({
        target: {
          name: 'firstName',
          value: 'john'
        }
      });
      component.instance().onChange({
        target: {
          name: 'email',
          value: 'john@email.com'
        }
      })

      expect(typeof component.state().user).toBe('object');
      expect(component.state().user.email).toBe('john@email.com');
      expect(component.state().user.firstName).toBe('john');
    });

    it('button calls onSubmit', () => {
      const form = component.instance();
      const onSubmitStub = sinon.stub(form, 'onSubmit');
      form.forceUpdate();

      const button = component.find('.registration-button');
      button.simulate('click', { preventDefault: ()=> {} });

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(onSubmitStub.callCount).toEqual(1);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });

    it('onSubmit calls createUser action', () => {

      const component = shallow(
        <UserModal {...props} />
      );
      component.instance().onSubmit({ preventDefault: () => {}} );

      expect(props.createUser.calledOnce).toEqual(true);
      expect(props.createUser.callCount).toEqual(1);
      expect(typeof props.createUser.args[0]).toEqual('object');
    });

    it('handleOpenDialog/handleCloseDialog method should set state', () => {
      expect(component.state().openDialog).toEqual(false);

      component.instance().handleOpenDialog();

      expect(component.state().openDialog).toEqual(true);

      component.instance().handleCloseDialog();

      expect(component.state().openDialog).toEqual(false);
    });

    it('update input fields on state change', () => {

      const component = shallow(
        <UserModal {...props} />
      );

      expect(component.state().user).toEqual({});

      component.instance().onChange({
        target: {
          name: 'firstName',
          value: 'john'
        }
      });
      component.instance().onChange({
        target: {
          name: 'email',
          value: 'john@email.com'
        }
      })

      const firstNameInput = component.find('.form-input-firstname');
      const emailInput = component.find('.form-input-email');

      expect(firstNameInput.props().value).toEqual('john');
      expect(emailInput.props().value).toEqual('john@email.com');
    });
  });
});