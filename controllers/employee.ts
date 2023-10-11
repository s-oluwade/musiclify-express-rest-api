import {pool} from '../db';

export function getAllEmployees(req: any, res: any) {
  pool.query('SELECT * FROM `Employee`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
}

export function getEmployee(req: any, res: any) {
  // const employee = req.body;
  const employeeId = req.params?.id;

  if (employeeId) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `Employee` WHERE id=' + employeeId, function (err: Error, rows: any, fields: any) {
      // Connection is automatically released when query resolves
      if (err) {
        console.error('query error:' + err);
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
      }
    });
  }
}

interface Employee {
  employeeName: string;
  department: string;
  phone: string;
  job: string;
  sex: string;
  hireDate: string;
}

export function createEmployee(req: any, res: any) {
  let employee = req.body as Employee | null;

  if (employee) {
    const sqlQuery =
      'INSERT INTO `Employee` (' +
      Object.keys(employee).join(',') +
      ') VALUES (' +
      `"${employee.employeeName}"` +
      `"${employee.department}"` +
      `"${employee.phone}"` +
      `"${employee.job}"` +
      `"${employee.sex}"` +
      `"${employee.hireDate}"` +
      ')';

    pool.query(sqlQuery, (err: Error, rows: any, fields: any) => {
      if (err) {
        console.error('query error: ' + err);
      } else {
        res.json(rows);
      }
    });
  }
}
