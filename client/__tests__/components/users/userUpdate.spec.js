import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  UserUpdateComponent as UserUpdate
} from '../../../components/userComponents/UserUpdate';

describe('userComponent', () => {
  const props = {
    updateUser: sinon.spy(() => new Promise(() => {})),
    user: {
      id: 23,
      firstName: 'James',
      lastName: 'Favicet',
      email: 'jamifav@email.com',
      roleId: 3
    }
  };

  describe('UserUpdate container component', () => {
    const component = shallow(
      <UserUpdate {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('should change state via onChange method', () => {
      const userDetails = {
        email: 'jamifav@email.com',
        firstName: 'James',
        id: 23,
        lastName: 'Favicet',
        roleId: 3
      }
      expect(component.state().user).toEqual(userDetails);

      component.instance().onChange({
        target: {
          name: 'firstName',
          value: 'ade'
        }
      });
      component.instance().onChange({
        target: {
          name: 'email',
          value: 'ade@email.com'
        }
      })

      expect(typeof component.state().user).toBe('object');
      expect(component.state().user.email).toBe('ade@email.com');
      expect(component.state().user.firstName).toBe('ade');
    });

    it('button calls onSubmit', () => {
      const form = component.instance();
      const onSubmitStub = sinon.stub(form, 'onSubmit');
      form.forceUpdate();

      const button = component.find('.update-button');
      button.simulate('click', { preventDefault: ()=> {} });

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(onSubmitStub.callCount).toEqual(1);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });

    it('onSubmit calls updateUser action', () => {

      const component = shallow(
        <UserUpdate {...props} />
      );
      component.instance().onSubmit({ preventDefault: () => {}} );

      expect(props.updateUser.calledOnce).toEqual(true);
      expect(props.updateUser.callCount).toEqual(1);
      expect(typeof props.updateUser.args[0]).toEqual('object');
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
        <UserUpdate {...props} />
      );
      const userDetails = {
        email: 'jamifav@email.com',
        firstName: 'James',
        id: 23,
        lastName: 'Favicet',
        roleId: 3
      }
      expect(component.state().user).toEqual(userDetails);
      component.instance().onChange({
        target: {
          name: 'firstName',
          value: 'ade'
        }
      });
      component.instance().onChange({
        target: {
          name: 'email',
          value: 'ade@email.com'
        }
      })

      const firstNameInput = component.find('.form-input-firstname');
      const emailInput = component.find('.form-input-email');

      expect(firstNameInput.props().value).toEqual('ade');
      expect(emailInput.props().value).toEqual('ade@email.com');
    });
  });
});