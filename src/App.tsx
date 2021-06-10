import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from './styles/global';
import Routes from './routes';

export const App: React.FC = () => (
  <div className="App">
    <Router>
        <Routes />
      </Router>
    <GlobalStyle />
  </div>
);
