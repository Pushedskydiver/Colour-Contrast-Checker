import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

render(<Router />, document.querySelector('#main'));
registerServiceWorker();
