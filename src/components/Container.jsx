import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Hymns from '../pages/Hymns';
import Info from '../pages/Info';
import Schedule from '../pages/schedule';
import {getInfoConfig} from '../services/schedule';
import {Title} from './Bits';
import Errors from './errors';
import NavBar from './NavBar';

class Container extends React.Component {
  state = {
    dismissErrors: false,
  };

  dismissErrors = () => {
    this.setState({
      dismissErrors: true,
    });
  };

  render() {
    if (this.props.loading) {
      return <Title>Loading data...</Title>;
    }

    const {errorMessages} = getInfoConfig();

    let ErrorModal = null;
    if (errorMessages.length && !this.state.dismissErrors) {
      ErrorModal = ReactDOM.createPortal(
        <Errors dismiss={this.dismissErrors} errors={errorMessages} />,
        document.body
      );
    }

    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/:location" component={Home} />
          <Route exact path="/:location/hymns" component={Hymns} />
          <Route exact path="/:location/info" component={Info} />
          <Route exact path="/:location/schedule" component={Schedule} />
          <Route
            render={({location}) => {
              const baseName = location.pathname.split('/')[1];

              return <Redirect to={{pathname: `/${baseName}`}} />;
            }}
          />
        </Switch>

        {ErrorModal}

        <NavBar />
      </React.Fragment>
    );
  }
}

export default Container;
