import { createRoot } from 'react-dom/client';
import Router from './components/router';
import registerServiceWorker from './registerServiceWorker';

const container = document.querySelector('#main');
const root = createRoot(container!);

root.render(<Router />);

registerServiceWorker();
