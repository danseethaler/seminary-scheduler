import moment from 'moment';
import {getAllData} from '../airtable';
import {tables, noClassTypes} from '../constants';
import dac from '../data/dac';
import assignment from './assignment';

const addReferences = datasets => {
  datasets.substitutes = datasets.substitutes.map(sub => {
    const teacherId = sub.teacher[0];
    const teacher = datasets.teachers.find(({id}) => id === teacherId);
    return {
      date: sub.date,
      teacher: teacher.name,
    };
  });
  return datasets;
};

const transformData = datasets => {
  datasets.teachers = datasets.teachers
    .filter(({fulltime}) => fulltime)
    .map(({name}) => name);

  datasets.students = datasets.students
    .filter(({name}) => name)
    .map(({name}) => name);

  return datasets;
};

const classWeeks = [];

const getTeacher = (date, type, teachers, swaps, substitutes) => {
  // If there's no class return null
  if (noClassTypes.includes(type)) {
    return null;
  }

  // Return the substitute if one is listed
  const substitute = substitutes.find(({date: subData}) => subData === date);
  if (substitute) return substitute.teacher;

  // Set the week index
  const week = moment(date).week();
  const year = moment(date).year();
  let dateWeekYear = `${week}_${year}`;

  // If this is a new week
  if (!classWeeks.includes(dateWeekYear)) {
    classWeeks.push(dateWeekYear);
    // Move the current teacher to end of the array
    teachers.push(teachers.shift());
  }

  // Move the current teacher to end of the array
  if (swaps.some(({date: swapDate}) => swapDate === date)) {
    teachers.push(teachers.shift());
  }

  return teachers[0];
};

const setupLessons = (dates, lessons) => {
  let lessonIndex = -1;
  return dateIndex => {
    lessonIndex++;

    if (!dates[dateIndex]) return null;

    const {type, notes} = dates[dateIndex];

    switch (type) {
      case 'class':
        return lessons[lessonIndex];

      case 'custom':
        return {notes};

      case 'flex':
      case 'holiday':
      case 'cancelled':
      default:
        return null;
    }
  };
};

const matchDatesToLessons = ({
  students,
  dates,
  teachers,
  swaps,
  substitutes,
}) => {
  const assignments = ['Opening Prayer', 'Spritual Thought', 'Closing Prayer'];

  const getNextDevotional = assignment(assignments, students);
  const getLesson = setupLessons(dates, dac);

  return dates.map(({date, type, lessonCount = 1}, i) => {
    const devotional = noClassTypes.includes(type) ? null : getNextDevotional();

    const lessons = [];
    for (let index = 0; index < lessonCount; index++) {
      const lesson = getLesson(i);
      if (lesson) lessons.push(lesson);
    }

    const teacher = getTeacher(date, type, teachers, swaps, substitutes);

    return {date, type, teacher, devotional, lessons};
  });
};

let schedule;

export default () =>
  getAllData(tables)
    .then(addReferences)
    .then(transformData)
    .then(matchDatesToLessons)
    .then(fullSchedule => {
      schedule = fullSchedule;
    });

export const getSchedule = () => schedule;
