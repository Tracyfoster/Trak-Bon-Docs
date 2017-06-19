import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  RoleModalComponent as RoleModal
} from '../../../components/roleComponents/RoleModal';

describe('RoleComponent', () => {
  const props = {
    createRole: sinon.spy(() => new Promise(() => {})),
    updateRole: sinon.spy(() => new Promise(() => {})),
    role: {
      id: 3,
      roleName: 'Gamer'
    }
  };

  describe('RoleModal container component', () => {
    const component = shallow(
      <RoleModal {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('should change state via onChange method', () => {

      const roleState = {
        id: 3,
        roleName: 'Gamer'
      }
      expect(component.state().role).toEqual(roleState);

      component.instance().onChange({
        target: {
          name: 'roleName',
          value: 'Famer'
        }
      });
      expect(typeof component.state().role).toBe('object');
      expect(component.state().role.roleName).toEqual('Famer');
    });

    it('button calls onSubmit', () => {
      const form = component.instance();
      const onSubmitStub = sinon.stub(form, 'onSubmit');
      form.forceUpdate();

      const button = component.find('.role-button');
      button.simulate('click', { preventDefault: ()=> {} });

      expect(onSubmitStub.calledOnce).toEqual(true);
      expect(onSubmitStub.callCount).toEqual(1);
      expect(typeof onSubmitStub.args[0]).toEqual('object');
    });

    it('onSubmit calls updateRole action', () => {

      const component = shallow(
        <RoleModal {...props} />
      );
      component.instance().onSubmit({ preventDefault: () => {}} );

      expect(props.updateRole.calledOnce).toEqual(true);
      expect(props.updateRole.callCount).toEqual(1);
      expect(typeof props.updateRole.args[0]).toEqual('object');
    });

    it('onSubmit calls createRole action', () => {
      const props = {
        createRole: sinon.spy(() => new Promise(() => {})),
        updateRole: sinon.spy(() => new Promise(() => {})),
        role: {
          roleName: 'Life'
        }
      };
      const component = shallow(
        <RoleModal {...props} />
      );
      component.instance().onSubmit({ preventDefault: () => {}} );
      expect(props.createRole.calledOnce).toEqual(true);
      expect(props.createRole.callCount).toEqual(1);
      expect(typeof props.createRole.args[0]).toEqual('object');
    });

    it('handleOpenDialog/handleCloseDialog method should set state', () => {
      expect(component.state().openDialog).toEqual(false);

      component.instance().handleOpenDialog();

      expect(component.state().openDialog).toEqual(true);

      component.instance().handleCloseDialog();

      expect(component.state().openDialog).toEqual(false);
    });

    it('update input fields on state change', () => {
      const roleState = {
        id: 3,
        roleName: 'Gamer'
      }
      const component = shallow(
        <RoleModal {...props} />
      );

      expect(component.state().role).toEqual(roleState);

      component.instance().onChange({
        target: {
          name: 'roleName',
          value: 'Wollie'
        }
      });

      const roleInput = component.find('.form-input-roleName');

      expect(roleInput.props().value).toEqual('Wollie');
    });
  });
});