import { createRoot } from 'react-dom/client';
import Router from './components/router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.querySelector('#main');
const root = createRoot(container!);

root.render(<Router />);

serviceWorkerRegistration.register();
