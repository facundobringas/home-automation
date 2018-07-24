import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Defining globals to avoid imports in every test file
global.React = React;

global.shallow = shallow;
