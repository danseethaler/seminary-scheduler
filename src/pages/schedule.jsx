import {map} from 'lodash';
import moment from 'moment';
import React from 'react';
import styled from 'react-emotion';
import UpChevron from 'react-icons/lib/io/chevron-up';
import {Card, Title} from '../components/Bits';
import {
  AssignmentSmall,
  Devotional,
  LessonTitle,
} from '../components/LessonCard';
import theme from '../config/theme';
import {typeColors, typesWithClass} from '../constants';
import {getSchedule} from '../services/schedule';

const WeekContainer = styled.div(({on}) => ({
  borderLeft: `3px solid ${on ? '#e5d1e6' : '#abd9e4'}`,
}));

const ExpandablesContainer = styled.div({
  display: 'flex',
  // justifyContent: 'flex-end',
});

const groupBy = schedule =>
  schedule.reduce((weekGroups, date) => {
    const currentWeek = weekGroups[weekGroups.length - 1];
    if (currentWeek && currentWeek.some(({week}) => date.week === week)) {
      currentWeek.push(date);
    } else {
      weekGroups.push([date]);
    }

    return weekGroups;
  }, []);
const ExpandButton = styled.button({
  backgroundColor: '#acd9e3',
  borderRadius: '3em',
  padding: '1em 2em',
  border: 'none',
  margin: '0 0 5px 5px',
  cursor: 'pointer',
  outline: 0,
  color: 'white',
  ':hover': {
    backgroundColor: '#8bb9c3',
  },
});

class Schedule extends React.Component {
  state = {
    expandedDates: [],
  };

  toggleExpandedDate = id => {
    if (this.state.expandedDates.some(date => date === id)) {
      this.setState({
        expandedDates: this.state.expandedDates.filter(date => id !== date),
      });
    } else {
      this.setState({expandedDates: [...this.state.expandedDates, id]});
    }
  };

  expandToggle = on => {
    if (on) {
      this.setState({expandedDates: getSchedule().map(({date}) => date)});
    } else {
      this.setState({expandedDates: []});
    }
  };

  render() {
    const scheduleWeeks = groupBy(getSchedule(), 'week');
    let on = false;
    return (
      <React.Fragment>
        <Title>Schedule</Title>
        <ExpandablesContainer>
          <ExpandButton onClick={() => this.expandToggle(true)}>
            Expand All
          </ExpandButton>
          <ExpandButton onClick={() => this.expandToggle(false)}>
            Collapse All
          </ExpandButton>
        </ExpandablesContainer>
        <Card style={{marginBottom: 70}}>
          {scheduleWeeks.map((week, weekKey) => {
            on = !on; // Toggle on
            return (
              <WeekContainer key={weekKey} on={on}>
                {map(week, date => (
                  <ScheduleDate
                    key={date.date}
                    toggleExpanded={this.toggleExpandedDate}
                    expanded={this.state.expandedDates.some(
                      id => date.date === id
                    )}
                    expandable={typesWithClass.indexOf(date.type) >= 0}
                    {...date}
                  />
                ))}
              </WeekContainer>
            );
          })}
        </Card>
      </React.Fragment>
    );
  }
}

const LessonContainer = styled.div(({expandable}) => ({
  padding: 12,
  borderBottom: '1px solid #eaeaea',
  cursor: expandable ? 'pointer' : 'initial',
  ':hover': {
    backgroundColor: expandable ? theme.colors.background.primary : 'initial',
  },
}));

const TypeTag = styled.span(({type}) => ({
  padding: '3px 7px',
  borderRadius: 10,
  backgroundColor: typeColors[type],
  color: '#565656',
  marginBottom: 5,
}));

const TopContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const DetailContainer = styled.div({
  paddingTop: 16,
  display: 'flex',
  flexDirection: 'column',
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
    teacher = '',
    type,
    notes = '',
    expanded = false,
    toggleExpanded,
    expandable,
  } = classConfig;
  const formatedDate = moment(date).format('dddd, MMMM D');

  return (
    <LessonContainer
      expandable={expandable}
      onClick={() => {
        if (expandable) {
          toggleExpanded(date);
        }
      }}
      type={type}
    >
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
          {expandable ? (
            <UpChevron
              style={
                expanded
                  ? {
                      transition: 'all 200ms ease',
                      transform: 'rotate(-180deg)',
                    }
                  : {transition: 'all 200ms ease', transform: 'rotate(0deg)'}
              }
              color={theme.colors.background.shadow}
            />
          ) : null}
        </RightFlex>
      </TopContainer>
      {expanded ? (
        <DetailContainer>
          {devotional ? (
            <React.Fragment>
              <LessonTitle>Devotional</LessonTitle>
              <Devotional devotional={devotional} />
            </React.Fragment>
          ) : null}
        </DetailContainer>
      ) : null}
    </LessonContainer>
  );
};

export default Schedule;
