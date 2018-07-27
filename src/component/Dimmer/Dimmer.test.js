/* globals React, shallow */
import Dimmer from '.';

// Mock
const mockDocument = {
  querySelector: () => ({
    querySelector: () => ({
      getContext: () => ({
        save: jest.fn(),
        translate: jest.fn(),
        rotate: jest.fn(),
        createLinearGradient: () => ({ addColorStop: jest.fn() }),
        moveTo: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        stroke: jest.fn(),
        restore: jest.fn(),
      }),
      style: { height: 100, width: 100 },
      getBoundingClientRect: () => ({}),
    }),
    addEventListener: jest.fn(),
    getBoundingClientRect: () => ({}),
  }),
  addEventListener: jest.fn(),
};

Object.defineProperty(window, 'document', {
  value: mockDocument,
});
// Tests
test('renders without crashing', () => {
  shallow(<Dimmer device={{}} updateDevice={jest.fn()} />);
});

test('receives props', () => {
  const props = {
    device: { name: 'Device', active: true, brightness: 70 },
    updateDevice: jest.fn(),
  };
  const wrapped = shallow(<Dimmer {...props} />);
  expect(wrapped.instance().props).toEqual(props);
});
