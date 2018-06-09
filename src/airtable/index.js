import Airtable from 'airtable';

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

export default base;
