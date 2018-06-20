import React from 'react';
import {Title} from '../components/Bits';
import LessonCard from '../components/LessonCard';
import {getNextClass} from '../services/schedule';

export default () => {
  const nextClass = getNextClass();

  return (
    <React.Fragment>
      <Title>{nextClass.dayName}</Title>
      <LessonCard {...nextClass} />
    </React.Fragment>
  );
};
