import React, {Component} from 'react';
import {getSchedule} from '../services/schedule';
import {Span} from '../components/text';

class Schedule extends Component {
  render() {
    const schedule = getSchedule();
    return schedule.map(date => <ScheduleDate key={date.date} {...date} />);
  }
}

const ScheduleDate = ({
  date,
  devotional,
  lesson,
  teacher,
  title,
  type,
  url,
  ...rest
}) => {
  return (
    <div>
      <Span type="primary">Today</Span>
      {date} - {title}
      <p>{type}</p>
    </div>
  );
};

export default Schedule;
