/* globals React, shallow */
import Dimmer from '.';

test('renders without crashing', () => {
  shallow(<Dimmer />);
});

test('receives props', () => {
  const props = { device: { name: 'Device', active: true, brightness: 70 } };
  const wrapped = shallow(<Dimmer {...props} />);
  expect(wrapped.instance().props).toEqual(props);
});
