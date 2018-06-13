import {ThemeProvider} from 'emotion-theming';
import React, {Component} from 'react';
import './App.css';
import theme from './config/theme';
import logo from './logo.svg';

import setupSchedule from './services/schedule';

class App extends Component {
  state = {loaded: false};

  componentDidMount() {
    setupSchedule().then(schedule => {
      this.setState({loaded: true});
    });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
