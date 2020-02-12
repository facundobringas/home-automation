/* globals React, shallow */
import Dimmer from '.';
import { Provider } from 'rendition';
import {store} from '../../store/store'

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
  shallow(<Provider store={store}><Dimmer device={{}} updateDevice={jest.fn()} /></Provider>);
});

