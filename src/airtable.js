import Airtable from 'airtable';
import moment from 'moment';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyIlUCXzs478blRK',
});

const base = Airtable.base('app6uhinwR8sGR8uh');

// Takes a table name and an array of records to insert
// return a promise that resolves when complete
export const insertRecords = (tableName, records) =>
  new Promise((resolve, reject) => {
    const recordsCount = records.length;

    const insertRow = () => {
      const record = records.shift();
      base(tableName).create(record, (err, record) => {
        if (err) {
          return reject(err);
        }

        if (records.length > 0) {
          insertRow();
        } else {
          resolve(recordsCount + ' records created');
        }
      });
    };

    insertRow();
  });

export const setupClassDates = (start, end) => {
  const dates = [];
  start = moment(start);
  end = moment(end);

  while (start <= end) {
    if (start.format('ddd') !== 'Sat' && start.format('ddd') !== 'Sun') {
      dates.push({
        date: start.format('M/D/YYYY'),
        type: 'class',
        lessons: 1,
      });
    }
    start = start.add(1, 'days');
  }

  return insertRecords('dates', dates);
};

export const getData = table =>
  new Promise((resolve, reject) => {
    let rows = [];
    base(table)
      .select({view: 'Grid view'})
      .eachPage(
        (records, fetchNextPage) => {
          rows = rows.concat(records);
          fetchNextPage();
        },
        err => {
          if (err) return reject(err);
          resolve(rows.map(row => row.fields));
        }
      );
  });
