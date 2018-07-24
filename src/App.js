import React from 'react';
import { Provider } from 'rendition';
import MyNavbar from './component/MyNavbar';

const App = () => (
  <Provider>
    <MyNavbar />
  </Provider>
);

export default App;
