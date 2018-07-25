import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import MyNavbar from './component/MyNavbar';
import Main from './component/Main';

it('renders without crashing', () => {
  shallow(<App />);
});

test('renders a MyNavbar component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(MyNavbar)).toHaveLength(1);
});

test('renders a Main component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Main)).toHaveLength(1);
});
