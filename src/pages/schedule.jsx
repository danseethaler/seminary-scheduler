import moment from 'moment';
import React, {Component} from 'react';
import styled from 'react-emotion';
import {Card, Title} from '../components/Bits';
import {LessonDate} from '../components/LessonCard';
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
const CancelledClass = ({notes}) => `Cancelled${displayNotes(notes)}`;

const Holiday = ({notes}) => `Holiday!${displayNotes(notes)}`;

const LessonContainer = styled.div({
  padding: 12,
  borderBottom: '1px solid #eaeaea',
});

const displayNotes = notes => (notes ? ` - ${notes}` : '');

const ScheduleDate = classConfig => {
  const {date, devotional, lessons, teacher, type, notes} = classConfig;
  const formatedDate = moment(date).format('MMM D');

  let innerContent = null;
  let title = '';
  const lesson = lessons[0];

  if (type === 'class' && lesson) {
    innerContent = teacher;
    title = lesson.title;
  }

  if (type === 'holiday') {
    // innerContent = <Holiday {...classConfig} />;
    title = 'Holiday!';
    innerContent = notes;
  }

  if (type === 'flex') {
    title = 'Flex day';
    innerContent = notes;
  }

  if (type === 'cancelled') {
    // innerContent = <CancelledClass {...classConfig} />;
    title = 'Cancelled - no class today!';
  }

  return (
    <LessonContainer>
      <LessonDate>
        {type} - {formatedDate} - {title}
      </LessonDate>
      {innerContent}
    </LessonContainer>
  );
};

export default Schedule;
