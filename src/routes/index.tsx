import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/home';
import Luke from '../pages/luke';
import Chars from '../pages/chars';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path='/'
      exact
      component={Home}
    />

    <Route
      path='/luke'
      exact
      component={Luke}
    />

    <Route
      path='/chars'
      exact
      component={Chars}
    />
  </Switch>
);

export default Routes;
