import React from 'react';
import {
  configure, shallow, mount, render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';

configure({ adapter: new Adapter() });

// Defining globals to avoid imports in every test file
global.React = React;

global.shallow = shallow;
global.mount = mount;
global.render = render;

global.fetch = fetch;
