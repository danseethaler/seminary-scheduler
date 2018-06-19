import {ThemeProvider} from 'emotion-theming';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import BaseSelector from './components/BaseSelector';
import theme from './config/theme';

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <BaseSelector />
    </ThemeProvider>
  </Router>
);
