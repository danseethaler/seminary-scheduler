import moment from 'moment';
import React, {Component} from 'react';
import styled from 'react-emotion';
import {Card, Title} from '../components/Bits';
import {Lesson} from '../components/LessonCard';
import {typeColors} from '../constants';
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

const TypeTag = styled.span(({type}) => ({
  padding: '3px 7px',
  borderRadius: 10,
  backgroundColor: typeColors[type],
  color: '#565656',
}));

const TopContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const ScheduleDate = classConfig => {
  const {date, devotional, lessons, teacher, type, notes} = classConfig;
  const formatedDate = moment(date).format('dddd, MMMM D');

  let innerContent = null;
  let title = '';
  const lesson = lessons[0];

  if (type === 'class' && lesson) {
    title = <Lesson {...lesson} />;
    innerContent = <p>{teacher}</p>;
  }

  if (type === 'holiday') {
    innerContent = <p>{notes}</p>;
  }

  if (['flex', 'party', 'assessment'].indexOf(type) >= 0) {
    innerContent = (
      <React.Fragment>
        <p>{teacher}</p>
        <p>{notes}</p>
      </React.Fragment>
    );
  }

  if (type === 'cancelled') {
    innerContent = <p>{notes}</p>;
  }

  return (
    <LessonContainer type={type}>
      <TopContainer>
        <div>
          {formatedDate}
          {title}
          {innerContent}
        </div>
        <TypeTag type={type}>{type}</TypeTag>
      </TopContainer>
    </LessonContainer>
  );
};

export default Schedule;
