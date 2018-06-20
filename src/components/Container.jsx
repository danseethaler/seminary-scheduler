import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Hymns from '../pages/Hymns';
import Links from '../pages/Links';
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
        <Route exact path="/:location/links" component={Links} />
        <Route exact path="/:location/schedule" component={Schedule} />
      </Switch>

      <NavBar />
    </React.Fragment>
  );
};
