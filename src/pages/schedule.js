import React, {Component} from 'react';
import {getSchedule} from '../services/schedule';

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
      <span type="primary">Today</span>
      {date} - {title}
      <p>{type}</p>
    </div>
  );
};

export default Schedule;
