import React from 'react';
import { shallow } from 'enzyme';
import { DropDownButton } from 'rendition';
import MyNavbar from '.';

test('renders without crashing', () => {
  shallow(<MyNavbar />);
});

test('MyNavbar contains 1 DropDownButton', () => {
  const wrapper = shallow(<MyNavbar />);
  expect(wrapper.find(DropDownButton)).toHaveLength(1);
});
