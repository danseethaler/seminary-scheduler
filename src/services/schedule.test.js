import {typesWithClass} from '../constants';
import dac from '../data/dac';
import transformedData from '../services/transformedData.fixture';
import {matchDatesToLessons, setupInfoConfig} from './schedule';

describe('Setup schedule', () => {
  const schedule = matchDatesToLessons(transformedData);

  test('Dates without a class should not have a teacher', () => {
    const breakDatesWithTeachers = schedule.filter(
      ({type, teacher}) => typesWithClass.indexOf(type) < 0 && teacher
    );

    expect(breakDatesWithTeachers).toHaveLength(0);
  });

  test('No class dates should be missing a teacher', () => {
    const classDatesWithoutTeachers = schedule.filter(
      ({type, teacher}) => typesWithClass.indexOf(type) < 0 && teacher
    );
    expect(classDatesWithoutTeachers).toHaveLength(0);
  });
});

describe('Setup info config', () => {
  const fullSchedule = matchDatesToLessons(transformedData);
  const response = setupInfoConfig(transformedData, dac, fullSchedule);

  test('Return an object with expected keys', () => {
    expect(Object.keys(response)).toMatchObject([
      'countOfClassLessons',
      'errorMessages',
      'teacherConfig',
    ]);
  });

  test('The number of lessons should be the sum of lessonCount on each lesson type', () => {
    expect(response.countOfClassLessons).toEqual(160);
  });
});
