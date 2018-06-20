import moment from 'moment';
import React, {Component} from 'react';
import {Card, Title} from '../components/Bits';
import {getSchedule} from '../services/schedule';

class Schedule extends Component {
  render() {
    const schedule = getSchedule();
    return schedule.map(date => <ScheduleDate key={date.date} {...date} />);
  }
}

const ScheduleDate = ({date, devotional, lessons, teacher, ...rest}) => {
  const lesson = lessons[0];
  if (!lesson) return null;
  return (
    <React.Fragment>
      <Title>Schedule</Title>
      <Card>
        {moment(date).format('MMM D')} - {lesson.title}
      </Card>
    </React.Fragment>
  );
};

export default Schedule;
