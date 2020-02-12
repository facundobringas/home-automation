/* globals React, shallow */
import { Table } from 'rendition';
import Lighting from '.';
import { Provider } from 'rendition';
import {store} from '../../store/store'

test('renders without crashing', () => {
  shallow(<Provider store={store}><Lighting /></Provider>);
});

