import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Validator from '../../../utils/Validator.js';
import {
  DrawerBarComponent as DrawerBar
} from '../../../components/common/DrawerBar';

describe('Common Components', () => {
  const props = {
    auth: {
      isAuthenticated: true
    }
  };

  describe('DrawerBar container component', () => {
    const component = shallow(
      <DrawerBar {...props} />
    );
    
    it('should render with props', () => {
      expect(Object.keys(component.props()).length).toEqual(3);
      expect(component.length).toEqual(1);
    });
  });
});