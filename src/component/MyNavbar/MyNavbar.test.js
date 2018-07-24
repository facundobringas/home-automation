import React from 'react';
import { shallow } from 'enzyme';
import { Container, DropDownButton } from 'rendition';
import MyNavbar from './index';

test('renders without crashing', () => {
  shallow(<MyNavbar />);
});

test('MyNavbar contains 2 Containers', () => {
  const wrapper = shallow(<MyNavbar />);
  expect(wrapper.find(Container)).toHaveLength(2);
});

test('MyNavbar contains 1 DropDownButton', () => {
  const wrapper = shallow(<MyNavbar />);
  expect(wrapper.find(DropDownButton)).toHaveLength(1);
});
