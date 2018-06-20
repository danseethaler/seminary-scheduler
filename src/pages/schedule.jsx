import moment from 'moment';
import React, {Component} from 'react';
import styled from 'react-emotion';
import {Card, Title} from '../components/Bits';
import {getSchedule} from '../services/schedule';

class Schedule extends Component {
  render() {
    const schedule = getSchedule();
    return (
      <React.Fragment>
        <Title>Schedule</Title>
        <Card style={{marginBottom: 70}}>
          {schedule.map(date => <ScheduleDate key={date.date} {...date} />)}
        </Card>
      </React.Fragment>
    );
  }
}

const LessonContainer = styled.div({
  padding: 12,
  borderBottom: '1px solid #eaeaea',
});

const ScheduleDate = ({date, devotional, lessons, teacher, type, notes}) => {
  const displayNotes = notes ? ` - ${notes}` : '';

  if (type === 'holiday') {
    return <LessonContainer>Holiday!{displayNotes}</LessonContainer>;
  }

  if (type === 'flex') {
    return <LessonContainer>Holiday!{displayNotes}</LessonContainer>;
  }

  if (type === 'cancelled') {
    return <LessonContainer>Class cancelled{displayNotes}</LessonContainer>;
  }

  const lesson = lessons[0];

  if (!lesson) return null;

  return (
    <LessonContainer>
      {moment(date).format('MMM D') + ' - ' + lesson.title}
    </LessonContainer>
  );
};

export default Schedule;
