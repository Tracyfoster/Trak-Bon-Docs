import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  DocumentViewComponent as DocumentView
} from '../../../components/documentComponents/DocumentView';

describe('DocumentComponent', () => {

  describe('DocumentView container component', () => {
    const props = {
      deleteDocument: sinon.spy(() => new Promise(() => {})),
      document: {},
      auth: { user: { id: 2 } }
    };
    const component = shallow(
      <DocumentView {...props} />
    );

    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(1);
      expect(component.length).toEqual(1);
    });

    it('button calls onUpdate', () => {
      const props = {
        deleteDocument: sinon.spy(() => new Promise(() => {})),
        document: {
          userId: 2
        },
        auth: { user: { id: 2 } }
      };
      const component = shallow(
        <DocumentView {...props} />
      );

      const onUpdateStub = sinon.stub(component.instance(), 'onUpdate');

      const button = component.find('.update-button');
      button.simulate('click');

      expect(onUpdateStub.calledOnce).toEqual(true);
      expect(onUpdateStub.callCount).toEqual(1);
      expect(typeof onUpdateStub.args[0]).toEqual('object');
    });

    it('button calls onDelete', () => {
      const props = {
        deleteDocument: sinon.spy(() => new Promise(() => {})),
        document: {
          userId: 2
        },
        auth: { user: { id: 2 } }
      };
      const component = shallow(
        <DocumentView {...props} />
      );
      const onDeleteSpy = sinon.spy(component.instance(), 'onDelete');

      const button = component.find('.delete-button');
      button.simulate('click');

      expect(onDeleteSpy.calledOnce).toEqual(true);
      expect(onDeleteSpy.callCount).toEqual(1);
      expect(typeof onDeleteSpy.args[0]).toEqual('object');
    });

    it('onDelete calls deleteDocument action', () => {
      const props = {
        deleteDocument: sinon.spy(() => new Promise(() => {})),
        document: {
          id: 3
        },
        auth: { user: { id: 2 } }
      };
      const component = shallow(
        <DocumentView {...props} />
      );
      component.instance().onDelete();
      expect(props.deleteDocument.calledOnce).toEqual(true);
      expect(props.deleteDocument.callCount).toEqual(1);
      expect(typeof props.deleteDocument.args[0]).toEqual('object');
    });

    it('handleOpenDialog/handleCloseDialog method should set state', () => {
      expect(component.state().openDialog).toEqual(false);

      component.instance().handleOpenDialog();

      expect(component.state().openDialog).toEqual(true);

      component.instance().handleCloseDialog();

      expect(component.state().openDialog).toEqual(false);
    });

    // it('update input fields on state change', () => {
    //   const roleState = {
    //     id: 3,
    //     roleName: 'Gamer'
    //   }
    //   const component = shallow(
    //     <DocumentView {...props} />
    //   );

    //   expect(component.state().role).toEqual(roleState);

    //   component.instance().onChange({
    //     target: {
    //       name: 'roleName',
    //       value: 'Wollie'
    //     }
    //   });

    //   const roleInput = component.find('.form-input-roleName');

    //   expect(roleInput.props().value).toEqual('Wollie');
    // });
  });
});