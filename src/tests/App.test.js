import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const location = { pathname: '/' };
  const div = document.createElement('div');
  
  ReactDOM.render(<App location={location} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
