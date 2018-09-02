import moment from 'moment';
import {getAllData} from '../airtable';
import {typesWithNoClass, tables, typesWithClass} from '../constants';
import dac from '../data/dac';
import assignment from './assignment';

const SCHEDULE_VERSION = '0.0.2';

const cleanUpApiData = datasets => {
  datasets.teachers = datasets.teachers.map(({name}) => name);

  datasets.students = datasets.students
    .filter(({name}) => name)
    .map(({name}) => name);

  return datasets;
};

const classWeeks = [];

const getTeacher = (date, type, teachers) => {
  // If there's no class return null
  if (typesWithNoClass.includes(type)) return null;

  // Set the week index
  const week = moment(date).week();
  const year = moment(date).year();
  let weekYear = `${week}_${year}`;

  // Setup the first week so we don't push the first
  // teacher to the end
  if (classWeeks.length === 0) {
    classWeeks.push(weekYear);
  }

  // If this is a new week
  if (!classWeeks.includes(weekYear)) {
    classWeeks.push(weekYear);
    // Move the current teacher to end of the array
    teachers.push(teachers.shift());
  }

  return teachers[0];
};

const setupLessons = (dates, lessons) => {
  let lessonIndex = -1;
  return dateIndex => {
    if (!dates[dateIndex]) return null;

    const {type} = dates[dateIndex];

    switch (type) {
      case 'class':
        lessonIndex++;
        return lessons[lessonIndex];

      case 'flex':
      case 'holiday':
      case 'cancelled':
      default:
        return null;
    }
  };
};

export const matchDatesToLessons = ({students, teachers, dates}) => {
  const assignments = ['Opening Prayer', 'Spritual Thought', 'Closing Prayer'];

  const getNextDevotional = assignment(assignments, students);
  const getLesson = setupLessons(dates, dac);

  return dates.map(
    ({date, type, substitute, teacher_swap, lessonCount = 1, ...rest}, i) => {
      const devotional = typesWithNoClass.includes(type)
        ? null
        : getNextDevotional();

      const lessons = [];
      for (let index = 0; index < lessonCount; index++) {
        const lesson = getLesson(i);
        if (lesson) lessons.push(lesson);
      }

      // Move the current teacher to end of the array
      if (teacher_swap) teachers.push(teachers.shift());

      const teacher = substitute || getTeacher(date, type, teachers);

      return {
        date,
        type,
        teacher,
        week: moment(date).format('w'),
        devotional,
        lessons,
        ...rest,
      };
    }
  );
};

export const setupInfoConfig = (dates, classList, fullSchedule) => {
  const lessonCount = dates.reduce((lessonCounter, {type, lessonCount = 1}) => {
    if (typeof lessonCounter[type] === 'undefined') {
      lessonCounter[type] = 0;
    }

    lessonCounter[type] = lessonCounter[type] + lessonCount;
    return lessonCounter;
  }, {});

  const expectedClasses = classList.length;

  let errorMessages = [];

  if (lessonCount.class > expectedClasses) {
    errorMessages.push(
      `You have ${
        lessonCount.class
      } classes but there are only ${expectedClasses} this year. Consider changing class days in Airtable to flex days.`
    );
  } else if (lessonCount.class < expectedClasses) {
    errorMessages.push(
      `You have ${
        lessonCount.class
      } classes but there are ${expectedClasses} this year. Consider changing flex days in Airtable to class days or covering two classes on the same day.`
    );
  }

  const datesMissingType = dates
    .filter(({type, date}) => !type && date)
    .map(({date}) => moment(date).format('M/D/YYYY'));

  if (datesMissingType.length > 0) {
    errorMessages.push(
      `The following dates are missing a corresponding type: ${datesMissingType.join(
        ', '
      )}. Update Airtable to reflect the correct type (i.e. class, flex, etc.) or delete the date.`
    );
  }

  const teacherConfig = fullSchedule
    .filter(({teacher}) => teacher)
    .reduce((teacherConfig, {teacher, type}) => {
      if (!teacherConfig[teacher]) {
        teacherConfig[teacher] = {classCount: 0};
      }
      teacherConfig[teacher].classCount++;
      return teacherConfig;
    }, {});

  return {
    lessonCount,
    errorMessages,
    teacherConfig,
  };
};

const getLocalStorageName = baseName => `semimary_data_${baseName}`;

let schedule;
let infoConfig;

export default (baseName, callback) => {
  // Setup schedule from local
  const localData = JSON.parse(
    localStorage.getItem(getLocalStorageName(baseName)) || '{}'
  );

  if (localData.version === SCHEDULE_VERSION) {
    schedule = localData.schedule;
    infoConfig = localData.infoConfig;
    callback(localData.schedule, localData.infoConfig);
  }

  return getAllData(tables)
    .then(cleanUpApiData)
    .then(data => {
      // Replace outer scope schedule
      schedule = matchDatesToLessons(data);

      // Replace outer scope infoConfig
      infoConfig = setupInfoConfig(data.dates, dac, schedule);

      // Store local version of the app
      localStorage.setItem(
        getLocalStorageName(baseName),
        JSON.stringify({
          version: SCHEDULE_VERSION,
          schedule,
          infoConfig,
        })
      );

      // Return the updates to the app
      callback(schedule, infoConfig);
    });
};

export const getSchedule = () => schedule;
export const getInfoConfig = () => infoConfig;

const sortBy = property => {
  return (a, b) => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };
};

const getDayName = date => {
  const today = moment().startOf('day');
  const diff = moment(date).diff(today, 'days');

  if (diff < 0) {
    return 'No classes found';
  } else if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Tomorrow';
  } else {
    return `Next class in ${diff} days`;
  }
};

export const getNextClass = () => {
  const today = moment().startOf('day');
  const nextClass = schedule
    .sort(sortBy('date'))
    .filter(({type}) => typesWithClass.indexOf(type) >= 0)
    .find(({date}) => moment(date).diff(today, 'days') >= 0);

  if (!nextClass) {
    return {
      dayName: 'No classes found',
      finished: true,
    };
  }

  nextClass.dayName = getDayName(nextClass.date);
  return nextClass;
};
