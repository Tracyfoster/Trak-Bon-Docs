import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import {
  DocumentPageComponent as DocumentPage
} from '../../../components/documentComponents/DocumentPage';

describe('DocumentPage component', () => {
  const props = {
    userDocuments: {},
    fetchUserDocuments: sinon.spy(() => new Promise(() => {})),
    searchDocuments: sinon.spy(() => new Promise(() => {})),
    auth: {
      user: {
        id: 3
      },
      isAuthenticated: true
    },
    search: {}
  }
  const component = shallow(
    <DocumentPage {...props} />
  );

  it('should render with props', () => {
    expect(component.length).toEqual(1);
  });

  it('should change state.searchTerm via onChange method', () => {
    expect(component.state().searchTerm).toEqual('');

      component.instance().onChange({
        target: {
          value: 'world'
        }
      });

      expect(typeof component.state().searchTerm).toBe('string');
      expect(component.state().searchTerm).toBe('world');
  });


  it('componentWillReceiveProps was called on initial render', () => {
    const componentWillReceivePropsSpy = sinon.spy(component.instance(), 'componentWillReceiveProps');

    component.setProps({});

    expect(componentWillReceivePropsSpy.calledOnce).toBe(true);
    expect(componentWillReceivePropsSpy.callCount).toBe(1);
  });


  it('onSubmit was called on button click', () => {
    const component = shallow(
      <DocumentPage {...props} />
    );

    const onSubmitSpy = sinon.spy(component.instance(), 'onSubmit');

    const form = component.find('.document-form');

    form.simulate('submit', { preventDefault: () => {} });

    expect(onSubmitSpy.calledOnce).toBe(true);
    expect(onSubmitSpy.callCount).toBe(1);
  });

  it('onSubmit calls searchUsers action', () => {
    const props = {
      userDocuments: {},
      fetchUserDocuments: sinon.spy(() => new Promise(() => {})),
      searchDocuments: sinon.spy(() => new Promise(() => {})),
      auth: {
        user: {
          id: 3
        },
        isAuthenticated: true
      },
      search: {}
    }

    const component = shallow(
      <DocumentPage {...props} />
    );

    component.instance().onSubmit({ preventDefault: () => {} });

    expect(props.searchDocuments.calledOnce).toEqual(true);
    expect(props.searchDocuments.callCount).toEqual(1);
    expect(typeof props.searchDocuments.args[0]).toEqual('object');

  });

  it('clearSearch state.searchTerm', () => {
    const props = {
      userDocuments: {},
      fetchUserDocuments: sinon.spy(() => new Promise(() => {})),
      searchDocuments: sinon.spy(() => new Promise(() => {})),
      auth: {
        user: {
          id: 3
        },
        isAuthenticated: true
      },
      search: {}
    }
    const component = shallow(
      <DocumentPage {...props} />
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