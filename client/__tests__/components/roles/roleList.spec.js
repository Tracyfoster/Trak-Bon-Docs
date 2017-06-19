import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import
  RoleList
from '../../../components/roleComponents/RoleList';

describe('RoleList component', () => {
  it('should render with props', () => {
    const props = {
      roles: [],
      deleteRole: () => {},
    }

    const component = render(
      <RoleList {...props} />
    );

    expect(props.roles).toEqual([]);
    expect(Object.keys(props).length).toEqual(2);
  });

  it('should render with a table', () => {
    const props = {
      roles: [],
      deleteRole: () => {},
    }

    const component = render(
      <RoleList {...props} />
    );

    const table = component.find('table');
    expect(table.length).toEqual(1);
  });

  // it('IconButton calls deleteRole', () => {
  //   const props = {
  //     deleteRole: sinon.spy(() => new Promise(() => {})),
  //     role: [
  //       { id: 3, roleName: 'Testers', count: 1, createdAt: '2017-12-09' }
  //     ]
  //   };
  //   const component = shallow(
  //     <RoleList {...props} />
  //   );
  //   console.log(component);
  //   // expect(props.deleteRole.calledOnce).toEqual(true);
  //   // expect(props.deleteRole.callCount).toEqual(1);
  //   // expect(typeof props.deleteRole.args[0]).toEqual('object');
  // });

});