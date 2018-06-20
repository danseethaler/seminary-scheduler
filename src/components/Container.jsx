import React from 'react';
import styled from 'react-emotion';
import {getNextClass} from '../services/schedule';
import LessonCard from './LessonCard';
import {Switch, Route} from 'react-router-dom';
import Schedule from '../pages/schedule';
import Hymns from '../pages/hymns';
import NavBar from './NavBar';

export const Title = styled.h1(({theme, type = 'primary'}) => ({
  color: theme.colors.text[type],
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 300,
  fontSize: '1.8em',
}));

export default ({loading, title, children}) => {
  if (loading) {
    return <Title>Loading data...</Title>;
  }

  const nextClass = getNextClass();

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/:location"
          render={() => (
            <React.Fragment>
              <Title>{nextClass.dayName}</Title>
              <LessonCard {...nextClass} />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/:location/hymns"
          render={() => (
            <React.Fragment>
              <Title>Hymns</Title>
              <Hymns />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/:location/links"
          render={() => (
            <React.Fragment>
              <Title>Links</Title>
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/:location/schedule"
          render={() => (
            <React.Fragment>
              <Title>Schedule</Title>
              <Schedule />
            </React.Fragment>
          )}
        />
      </Switch>

      <NavBar />
    </React.Fragment>
  );
};
