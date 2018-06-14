import React, {Component} from 'react';
import moment from 'moment';
import {getSchedule} from '../services/schedule';

class Schedule extends Component {
  render() {
    const schedule = getSchedule();
    return schedule.map(date => <ScheduleDate key={date.date} {...date} />);
  }
}

const ScheduleDate = ({date, devotional, lessons, teacher, ...rest}) => {
  const lesson = lessons.shift();
  if (!lesson) return null;
  return (
    <div>
      {moment(date).format('MMM D')} - {lesson.title}
    </div>
  );
};

export default Schedule;
