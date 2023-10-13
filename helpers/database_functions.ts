import {pool} from '../db';

export function deleteRow(id: string | number, table: string) {
  let sqlQuery = null;

  sqlQuery = `DELETE FROM ${table} WHERE id=` + id;

  pool.query(sqlQuery, (err: Error, rows: any, fields: any) => {
    if (err) {
      console.error('query error: ' + err);
    } else {
      return rows;
    }
  });
}

export function updateRow(id: string | number, update: {[key: string]: any}, table: string) {
  let sqlQuery = null;

  sqlQuery =
    `UPDATE ${table} set ` +
    Object.entries(update)
      .map((field) => `${field[0]}="${field[1]}"`)
      .join(',') +
    ' WHERE id=' +
    id;

  pool.query(sqlQuery, (err: Error, rows: any, fields: any) => {
    if (err) {
      console.error('query error: ' + err);
    } else {
      return rows;
    }
  });
}
