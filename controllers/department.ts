import {pool} from '../db';

export function getDepartment(req: any, res: any) {
  const departmentId = req.params?.id;

  if (departmentId) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `Department` WHERE id=' + departmentId, function (err: Error, rows: any, fields: any) {
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

export function getAllDepartments(req: any, res: any) {
  // For pool initialization, see above
  pool.query('SELECT * FROM `Department`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
}

export function createDepartment(req: any, res: any) {
  res.send('Hello post department' + req.body);
}
