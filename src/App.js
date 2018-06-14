import {ThemeProvider} from 'emotion-theming';
import React, {Component} from 'react';
import './App.css';
import theme from './config/theme';
import Schedule from './pages/schedule';
import setupSchedule from './services/schedule';
import Container from './components/Container';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  state = {loaded: false};

  componentDidMount() {
    setupSchedule().then(() => {
      this.setState({loaded: true});
    });
  }
  render() {
    if (!this.state.loaded) return null;

    return (
      <Router>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Container />
            <NavBar />
          </React.Fragment>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
