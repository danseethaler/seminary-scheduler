import {ThemeProvider} from 'emotion-theming';
import React from 'react';
import styled from 'react-emotion';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import BaseSelector from './components/BaseSelector';
import theme from './config/theme';
import Reader from './pages/Reader';

const Wrapper = styled.div(({theme}) => ({
  margin: 'auto',
  maxWidth: 600,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 30,
}));

const Circle = styled.div(({theme}) => ({
  background: 'radial-gradient(circle at center, transparent 47%, #ef0b18 47%)',
  position: 'fixed',
  top: -50,
  right: -50,
  opacity: 0.2,
  borderRadius: 100,
  height: 190,
  width: 190,
}));

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/reader" component={Reader} />
        <Route
          render={() => (
            <Wrapper>
              <Circle />
              <BaseSelector />
            </Wrapper>
          )}
        />
      </Switch>
    </ThemeProvider>
  </Router>
);
