import React from 'react';
import { shallow, mount, render } from 'enzyme';
import
  DocumentList
from '../../../components/documentComponents/DocumentList';

describe('DocumentList component', () => {
  const documents = [{
    title: 'hello world',
    content: 'its good to be here',
    access: 'public',
    userId: 1,
    createdAt: '2017-06-14',
    User: {
      firstName: 'John',
      lastName: 'Ravi'
    }
  }];

  const props = {
    documents
  }

  it('should render with props', () => {

    const component = shallow(
      <DocumentList {...props} />
    );

    expect(props.documents).toEqual(documents);
    expect(Object.keys(props).length).toEqual(1);
  });

  it('should render with a table', () => {
    const props = {
      documents: []
    }

    const component = render(
      <DocumentList {...props} />
    );

    const table = component.find('table');
    expect(table.length).toEqual(1);
  });
});