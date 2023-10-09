// REST API
// OBJECTS: EMPLOYEE, DEPARTMENT

// import express from 'express';
// import bodyParser from 'body-parser';
// import mysql2 from 'mysql2';
// import 'dotenv/config';

require('dotenv').config();
const mysql2 = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// const connection = mysql2.createConnection({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   port: process.env.MYSQLPORT,
//   database: process.env.MYSQLDATABASE,
//   password: process.env.MYSQLPASSWORD,
// });

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql2.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  port: Number(process.env.MYSQLPORT),
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.get('/employees', (req: any, res: any) => {
  pool.query('SELECT * FROM `Employee`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get('/employees/:id', (req: any, res: any) => {
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
});

interface Employee {
  employeeName: string;
  department: string;
  phone: string;
  job: string;
  sex: string;
  hireDate: string;
}

app.post('/employees', (req: any, res: any) => {
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
});

app.get('/departments', (req: any, res: any) => {
  const department = req.body;

  if (department.id) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `Department` WHERE id=' + department.id, function (err: Error, rows: any, fields: any) {
      // Connection is automatically released when query resolves
      if (err) {
        console.error('query error:' + err);
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
      }
    });
  }
});

app.post('/departments', (req: any, res: any) => {
  res.send('Hello post department' + req.body);
});

app.put('/', (req: any, res: any) => {
  res.send('Hello put!');
});

app.delete('/', (req: any, res: any) => {
  res.send('Hello delete!');
});

app.listen(port, () => {
  console.log('listening on port: ' + port);
});

