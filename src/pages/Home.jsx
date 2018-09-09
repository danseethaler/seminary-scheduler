import React from 'react';
import {Card, CardButton, Title} from '../components/Bits';
import LessonCard, {LessonDate} from '../components/LessonCard';
import StudentPicker from '../components/StudentPicker';
import {getNextClass, getStudents} from '../services/schedule';

export default () => {
  const nextClass = getNextClass();
  const students = getStudents();

  return (
    <React.Fragment>
      <Title>{nextClass.dayName}</Title>
      <LessonCard {...nextClass} />
      {students && (
        <React.Fragment>
          <br />
          <br />
          <Card>
            <StudentPicker items={students}>
              {({item, getPickerProps}) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LessonDate customStyle={{margin: 20}}>{item}</LessonDate>
                  <CardButton {...getPickerProps()}>
                    <span
                      style={{
                        color: '#da252f',
                        margin: '0 0 10px',
                        textDecoration: 'none',
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 400,
                        fontSize: 18,
                        letterSpacing: '.1em',
                      }}
                    >
                      Pick a random student
                    </span>
                  </CardButton>
                </div>
              )}
            </StudentPicker>
          </Card>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
