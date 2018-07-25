/* globals React, shallow */
import { Table } from 'rendition';
import Lighting from '.';

test('renders without crashing', () => {
  shallow(<Lighting />);
});
test('renders a Table component', () => {
  const wrapper = shallow(<Lighting />);
  expect(wrapper.find(Table)).toHaveLength(1);
});
