import moment from 'moment';
import DownChevron from 'react-icons/lib/io/chevron-down';
import React, {Component} from 'react';
import styled from 'react-emotion';
import {Card, Title} from '../components/Bits';
import {AssignmentSmall, Lesson, LessonDate} from '../components/LessonCard';
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

const RightFlex = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

const displayTwo = (teacher, notes) => {
  if (!teacher) {
    return notes || '';
  }
  if (!notes) {
    return teacher || '';
  }
  if (!teacher && !notes) {
    return '';
  }
  return teacher + ' - ' + notes;
};

const ScheduleDate = classConfig => {
  const {
    date,
    devotional,
    lessons,
    teacher = '',
    type,
    notes = '',
  } = classConfig;
  const formatedDate = moment(date).format('dddd, MMMM D');

  let title = '';
  const lesson = lessons[0];

  if (type === 'class' && lesson) {
    title = <Lesson {...lesson} />;
  }

  return (
    <LessonContainer type={type}>
      <TopContainer>
        <div>
          <Title style={{fontSize: '1.1em', marginTop: 0}}>
            {formatedDate}
          </Title>
          <AssignmentSmall customStyle={{margin: 0}}>
            {displayTwo(teacher, notes)}
          </AssignmentSmall>
        </div>
        <RightFlex>
          <TypeTag type={type}>{type}</TypeTag>
          <DownChevron />
        </RightFlex>
      </TopContainer>
    </LessonContainer>
  );
};

export default Schedule;
