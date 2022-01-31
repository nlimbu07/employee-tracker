const mysql = require('mysql2');

// Connect to database
const dbconnect = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MYSQL password
    password: 'password',
    // connects with database
    database: 'employees',
  },

  // this message will be displayed if connected to database
  console.log('Connected to Employees Database')
);

dbconnect.connect((err) => {
  if (err) throw err;
  console.log('Result NOT FOUND!');
});

module.exports = dbconnect;
