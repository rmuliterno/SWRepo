import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/home';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path='/'
      exact
      component={Home}
    />
  </Switch>
);

export default Routes;
