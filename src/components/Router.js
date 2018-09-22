import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import baseStyles from '../styles/settings.global.styles';

const Router = () => (
  (
    baseStyles(),
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:background/:foreground" component={App} />
      </Switch>
    </BrowserRouter>
  )
);

export default Router;
