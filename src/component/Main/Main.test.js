/* globals React, shallow */
import Lighting from '../Lighting';
import Main from '.';

test('renders without crashing', () => {
  shallow(<Main />);
});

test('renders a Lighting component', () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.find(Lighting)).toHaveLength(1);
});
