import { hydrate, render } from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.querySelector('#main');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    hydrate(<Router />, rootElement);
  } else {
    render(<Router />, rootElement);
  }
  registerServiceWorker();
}

