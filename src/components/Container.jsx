import React from 'react';
import styled from 'react-emotion';
import {getNextClass} from '../services/schedule';
import Card from './LessonCard';

const Wrapper = styled.div(({theme}) => ({
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 30,
}));

export const Title = styled.h1(({theme, type = 'primary'}) => ({
  color: theme.colors.text[type],
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 300,
  fontSize: '1.8em',
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

const nextSchedule = getNextClass();

export default ({children}) => (
  <Wrapper>
    <Circle />
    <Title>Today</Title>
    <Card {...nextSchedule} />
    {/* {children} */}
  </Wrapper>
);
