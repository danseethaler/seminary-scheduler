import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {setupAirtable} from '../airtable';
import bases from '../config/bases';
import setupSchedule from '../services/schedule';
import Container from './Container';
import {SelectBase} from './SelectBase';

let currentBaseName = '';

class BaseSelector extends Component {
  state = {loaded: false};

  componentDidMount() {
    this.checkAndInitialize();
    this.unlisten = this.props.history.listen(this.checkAndInitialize);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getBaseFromPath = () => {
    const {pathname} = this.props.history.location;
    return pathname.split('/')[1];
  };

  checkAndInitialize = () => {
    const baseName = this.getBaseFromPath();

    if (!bases[baseName]) return;

    if (baseName !== currentBaseName) {
      this.initialize(baseName);
    }
    currentBaseName = baseName;
  };

  initialize = baseName => {
    setupAirtable(baseName);
    this.setState({loaded: false});

    setupSchedule(baseName, (schedule, infoConfig) => {
      this.setState({loaded: true, schedule, infoConfig});
    });
  };

  render() {
    const baseName = this.getBaseFromPath();

    if (!bases[baseName]) {
      return <SelectBase />;
    }

    if (!this.state.loaded) return <Container loading />;

    return <Container />;
  }
}

export default withRouter(BaseSelector);
