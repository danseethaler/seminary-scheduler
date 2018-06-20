import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Hymns from '../pages/Hymns';
import Info from '../pages/Info';
import Schedule from '../pages/Schedule';
import {Title} from './Bits';
import NavBar from './NavBar';

export default ({loading, title, children}) => {
  if (loading) {
    return <Title>Loading data...</Title>;
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

      <NavBar />
    </React.Fragment>
  );
};
