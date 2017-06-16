import React from 'react';
import { shallow, mount, render } from 'enzyme';
import
  UsersList
from '../../../components/userComponents/UsersList';

describe('UsersList component', () => {
  it('should render with props', () => {
    const props = {
      allUsers: [],
      auth: {},
      deleteUser: () => {},
    }

    const component = mount(
      <UsersList {...props} />
    );

    expect(component.props().allUsers).toEqual([]);
    expect(component.props().auth).toEqual({});
    expect(typeof component.props().deleteUser).toEqual('function');
    expect(Object.keys(component.props()).length).toEqual(3);
  });

  it('should render with a table', () => {
    const props = {
      allUsers: [],
      auth: {},
      deleteUser: () => {},
    }

    const component = mount(
      <UsersList {...props} />
    );

    const table = component.find('table');
    expect(table.length).toEqual(1);
  });
});