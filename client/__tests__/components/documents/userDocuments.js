import React from 'react';
import { shallow, mount, render } from 'enzyme';
import
  UserDocuments
from '../../../components/documentComponents/UserDocuments';

describe('UserDocuments component', () => {
  const data = [{
    title: 'hello world',
    content: 'its good to be here',
    access: 'public',
    userId: 1,
    createdAt: '2017-06-14'
  }, {
    title: 'hello john',
    content: 'its good to be john',
    access: 'private',
    userId: 1,
    createdAt: '2017-06-14'
  }, {
    title: 'hello jane',
    content: 'its good to be jane',
    access: 'role',
    userId: 1,
    createdAt: '2017-06-14'
  }, {
    title: 'hello paul',
    content: 'its good to be paul',
    access: 'public',
    userId: 1,
    createdAt: '2017-06-14'
  }];

  const props = {
    userDocuments: {
      data
    }
  }
  it('should render with props', () => {
    const component = shallow(
      <UserDocuments {...props} />
    );

    expect(props.userDocuments).toEqual({ data })
    expect(Object.keys(props).length).toEqual(1);
  });

  it('should render with 3 buttons', () => {
    const component = shallow(
      <UserDocuments {...props} />
    );

    const button = component.find('.button');
    expect(button.length).toEqual(3);
  });

  it('should paragraph if no document exists', () => {
    const props = {
      userDocuments: {
        data: []
      }
    }
    const component = shallow(
      <UserDocuments {...props} />
    );

    const paragraph = component.find('.no-document-p');

    expect(paragraph.length).toEqual(1);
    expect(paragraph.text()).toEqual('You have no documents yet');
  });
});