import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  RolePageComponent as RolePage
} from '../../../components/roleComponents/RolePage';

describe('RolePage component', () => {
  const props = {
    roles: [],
    fetchRoles: sinon.spy(() => new Promise(() => {})),
    deleteRole: sinon.spy(() => new Promise(() => {})),
    auth: {}
  }
  const component = shallow(
    <RolePage {...props} />
  );

  it('should render with props', () => {
    expect(component.length).toEqual(1);
  });
});