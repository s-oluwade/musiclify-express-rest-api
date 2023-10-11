const mysql2 = require('mysql2');

// const connection = mysql2.createConnection({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   port: process.env.MYSQLPORT,
//   database: process.env.MYSQLDATABASE,
//   password: process.env.MYSQLPASSWORD,
// });

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql2.createPool({
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
