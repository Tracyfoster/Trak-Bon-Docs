import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  UsersPageComponent as UsersPage
} from '../../../components/userComponents/UsersPage';

describe('UsersPage component', () => {
  const props = {
    allUsers: [],
    fetchUsers: sinon.spy(() => new Promise(() => {})),
    deleteUser: sinon.spy(() => new Promise(() => {})),
    searchUsers: sinon.spy(() => new Promise(() => {})),
    auth: {}
  }
  const component = shallow(
    <UsersPage {...props} />
  );

  it('should render with props', () => {
    expect(component.length).toEqual(1);
  });

  it('should change state.searchTerm via onChange method', () => {
    expect(component.state().searchTerm).toEqual('');

      component.instance().onChange({
        target: {
          value: 'hello world'
        }
      });

      expect(typeof component.state().searchTerm).toBe('string');
      expect(component.state().searchTerm).toBe('hello world');
  });


  it('componentWillReceiveProps was called on initial render', () => {
    const componentWillReceivePropsSpy = sinon.spy(component.instance(), 'componentWillReceiveProps');

    component.setProps({});

    expect(componentWillReceivePropsSpy.calledOnce).toBe(true);
    expect(componentWillReceivePropsSpy.callCount).toBe(1);
  });


  it('onSubmit was called on button click', () => {

    const onSubmitSpy = sinon.spy(component.instance(), 'onSubmit');

    const form = component.find('form');

    form.simulate('submit', { preventDefault: () => {} });

    expect(onSubmitSpy.calledOnce).toBe(true);
    expect(onSubmitSpy.callCount).toBe(1);

  });

  it('onSubmit calls searchUsers action', () => {
    const props = {
      allUsers: [],
      fetchUsers: sinon.spy(() => new Promise(() => {})),
      deleteUser: sinon.spy(() => new Promise(() => {})),
      searchUsers: sinon.spy(() => new Promise(() => {})),
      auth: {}
    }

    const component = shallow(
      <UsersPage {...props} />
    );

    component.instance().onSubmit({ preventDefault: () => {} });

    expect(props.searchUsers.calledOnce).toEqual(true);
    expect(props.searchUsers.callCount).toEqual(1);
    expect(typeof props.searchUsers.args[0]).toEqual('object');

  });

  it('clearSearch state.searchTerm', () => {
    const props = {
      allUsers: [],
      fetchUsers: sinon.spy(() => new Promise(() => {})),
      deleteUser: sinon.spy(() => new Promise(() => {})),
      searchUsers: sinon.spy(() => new Promise(() => {})),
      auth: {}
    }
    const component = shallow(
      <UsersPage {...props} />
    );

    expect(component.state().searchTerm).toEqual('');

    component.setState({
      searchTerm: 'hello'
    });

    expect(component.state().searchTerm).toEqual('hello');

    component.instance().clearSearch();

    expect(component.state().searchTerm).toEqual('');
  });
});