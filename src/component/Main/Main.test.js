/* globals React, shallow */
import { Container } from 'rendition';
import Main from '.';

test('renders without crashing', () => {
  shallow(<Main />);
});

test('renders a Container component', () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.find(Container)).toHaveLength(2);
});
