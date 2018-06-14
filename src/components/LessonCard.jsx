import React from 'react';
import styled from 'react-emotion';
import moment from 'moment';

const Card = styled.div(({theme}) => ({
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  opacity: 0.99,
  boxShadow: `0px 40px 160px ${theme.colors.background.shadow}`,
}));

const CardContent = styled.div(({theme}) => ({
  padding: 20,
}));

export const LessonNumber = styled.p(({theme, type = 'primary'}) => ({
  letterSpacing: '.1em',
  opacity: 0.7,
  color: theme.colors.text.secondary,
  fontSize: 14,
  margin: '0 0 10px',
}));

export const LessonTitle = styled.h2(({theme, type = 'primary'}) => ({
  textTransform: 'uppercase',
  color: '#a5adb7',
  margin: 0,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  fontSize: 16,
  letterSpacing: '.1em',
}));

export const LessonDate = styled.h3(({theme, type = 'primary'}) => ({
  color: theme.colors.text[type],
  fontFamily: "'Lato', sans-serif",
  fontWeight: 600,
  fontSize: 14,
  margin: '20px 0',
  letterSpacing: '.1em',
}));

export const Assignment = styled.h2(({theme, type = 'primary'}) => ({
  color: '#959ca5',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  fontSize: '.9em',
  letterSpacing: '.1em',
  marginBottom: 3,
}));

export const AssignmentSmall = styled.p(({theme, type = 'primary'}) => ({
  textTransform: 'uppercase',
  color: '#959ca5',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 400,
  letterSpacing: '.1em',
  fontSize: '.7em',
  marginTop: 0,
}));

export const ButtonText = styled.span(({theme, type = 'primary'}) => ({
  textTransform: 'uppercase',
  color: '#ef0b18',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  fontSize: '1.3em',
  letterSpacing: '.1em',
  opacity: 0.7,
}));

export const Hr = styled.div(({theme, type = 'primary'}) => ({
  width: 'calc(100% - 20px)',
  borderBottom: `1px solid rgba(226, 226, 226, 0.6)`,
}));

const CardButton = styled.button(({theme}) => ({
  position: 'relative',
  bottom: 0,
  backgroundColor: '#f7fbfc',
  padding: 20,
  width: '100%',
  border: 'none',
  borderRadius: '0 0 5px 5px',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all .3s',
  ':hover': {
    backgroundColor: '#f1f1f1',
  },
}));

const Lesson = ({title, lesson, url}) => (
  <React.Fragment>
    <LessonNumber>Lesson {lesson}</LessonNumber>
    <LessonTitle>{title}</LessonTitle>
  </React.Fragment>
);

export default ({date, devotional, lessons, teacher, type}) => {
  return (
    <Card>
      <CardContent>
        {lessons.map(lesson => <Lesson {...lesson} />)}
        <LessonDate>
          {moment(date).format('MMMM D')} - {teacher}
        </LessonDate>
        <Hr />
        {devotional.map(({assignee, assignment}) => (
          <React.Fragment>
            <Assignment>{assignee}</Assignment>
            <AssignmentSmall>{assignment}</AssignmentSmall>
          </React.Fragment>
        ))}
      </CardContent>
      <CardButton onClick={() => lessons.forEach(({url}) => window.open(url))}>
        <ButtonText>Open</ButtonText>
      </CardButton>
    </Card>
  );
};
