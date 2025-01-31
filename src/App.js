import React from 'react';
import { Provider } from 'rendition';
import './App.css';
import MyNavbar from './component/MyNavbar';
import Main from './component/Main';

const App = () => (
  <Provider>
    <MyNavbar />
    <Main />
  </Provider>
);

export default App;
