// REST API
// OBJECTS: EMPLOYEE, DEPARTMENT
import {createDepartment, getDepartment, getAllDepartments} from './controllers/department';
import {createEmployee, getAllEmployees, getEmployee} from './controllers/employee';
import {getTracksFromAlbum} from './helpers';

// import express from 'express';
// import bodyParser from 'body-parser';
// import mysql2 from 'mysql2';
// import 'dotenv/config';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
// app.use(bodyParser.json());

app.get('/', async (req: any, res: any) => {
  // spotify token request parameters
  const response = getTracksFromAlbum();

  res.json(response);
});

app.post('/', (req: any, res: any) => {
  res.send('post received');
});

app.get('/employees', getAllEmployees);
app.get('/employees/:id', getEmployee);
app.post('/employees', createEmployee);
app.get('/departments', getAllDepartments);
app.post('/departments', createDepartment);

app.put('/', (req: any, res: any) => {
  res.send('Hello put!');
});

app.delete('/', (req: any, res: any) => {
  res.send('Hello delete!');
});

app.listen(port, () => {
  console.log('listening on port: ' + port);
});
