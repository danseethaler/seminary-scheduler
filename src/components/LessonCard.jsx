import moment from 'moment';
import React from 'react';
import styled from 'react-emotion';
import {Card} from './Bits';

const CardContent = styled.div(({theme}) => ({
  padding: 20,
}));

export const LessonNumber = styled.p(({theme, type = 'primary'}) => ({
  textTransform: 'uppercase',
  letterSpacing: '.1em',
  opacity: 0.7,
  color: theme.colors.text.secondary,
  fontSize: 14,
  margin: '10px 0 5px',
}));

export const LessonTitle = styled.a(({theme, type = 'primary'}) => ({
  color: '#da252f',
  margin: '0 0 10px',
  textDecoration: 'none',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  fontSize: 18,
  letterSpacing: '.1em',
}));

export const LessonDate = styled.h3(
  ({theme, type = 'primary', customStyle}) => ({
    color: theme.colors.text[type],
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    margin: '0 0 20px 0',
    letterSpacing: '.1em',
    ...customStyle,
  })
);

export const Assignment = styled.h2(({theme, type = 'primary'}) => ({
  color: theme.colors.text.primary,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  fontSize: '.9em',
  letterSpacing: '.1em',
  marginBottom: 3,
}));

export const AssignmentSmall = styled.p(
  ({theme, type = 'primary', customStyle}) => ({
    textTransform: 'uppercase',
    color: '#959ca5',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    letterSpacing: '.1em',
    fontSize: 12,
    marginTop: 0,
    ...customStyle,
  })
);

export const ButtonText = styled.span(({theme, type = 'primary'}) => ({
  textTransform: 'uppercase',
  color: '#ef0b18',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  fontSize: 18,
  letterSpacing: '.1em',
  opacity: 0.7,
}));

export const Hr = styled.div(({theme, type = 'primary'}) => ({
  width: 'calc(100% - 20px)',
  margin: '20px 0',
  borderBottom: `1px solid rgba(226, 226, 226, 0.6)`,
}));

export const Lesson = ({title, lesson, url}) => {
  return (
    <React.Fragment>
      <LessonNumber>Lesson {lesson}</LessonNumber>
      <LessonTitle target="_blank" href={url}>
        {title}
      </LessonTitle>
    </React.Fragment>
  );
};

export const Devotional = ({devotional}) =>
  devotional.map(({assignee, assignment}) => (
    <React.Fragment key={assignment}>
      <Assignment>{assignee}</Assignment>
      <AssignmentSmall>{assignment}</AssignmentSmall>
    </React.Fragment>
  ));

export default ({finished, date, devotional, lessons, teacher, type}) => {
  if (finished) return null;

  return (
    <Card>
      <CardContent>
        <LessonDate>
          {moment(date).format('dddd, MMMM D')} - {teacher}
        </LessonDate>
        {lessons.map(lesson => (
          <Lesson key={lesson.lesson} {...lesson} />
        ))}
        <Hr style={{mariginTop: 10}} />
        <Devotional devotional={devotional} />
      </CardContent>
    </Card>
  );
};
