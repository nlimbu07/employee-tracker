const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');

menu = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update employee role',
          'Quit',
        ],
      },
    ])
    .then((res) => {
      switch (res.menu) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'Quit':
          db.end();
          break;
      }
    });
};

// displays Departments Table
viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.table(result);
    menu();
  });
};

// displays Roles Table
viewAllRoles = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    console.table(result);
    menu();
  });
};

// displays Employees Table with Departments and Roles
viewAllEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN 
  department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`,
    (err, result) => {
      if (err) throw err;
      console.table(result);
      menu();
    }
  );
};

// add department
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the department?',
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        [res.name],
        (err, result) => {
          if (err) throw err;
          console.log('Added department in the database');
        }
      );
      viewAllEmployees();
    });
};

// this will add role and salary
addRole = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the role?',
      },
      {
        name: 'salary',
        type: 'number',
        message: 'What is the salary of the role?',
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log('Please enter numeric value');
            return false;
          }
        },
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: getDepartment(),
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO role SET ?`,
        {
          title: res.role,
          salary: res.salary,
          department_id: res.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Added role in the database');
          menu();
        }
      );
    });
};

// this will add new employee, role, and assign manager
addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        choices: getRoles(),
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the employe's manager?",
        choices: getManagers(),
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role,
          manager_id: res.manager,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Added employee in the database');
          menu();
        }
      );
    });
};

// this will update existing employee's role
updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: 'employee',
        type: 'number',
        message: 'Enter employee ID',
      },
      {
        name: 'role',
        type: 'number',
        message: 'Enter role ID',
      },
    ])
    .then((res) => {
      db.query(
        `UPDATE employee SET role_id = ? WHERE id =?`,
        [res.role, res.employee],
        (err, result) => {
          if (err) throw err;
          console.log(result);
          viewAllEmployees();
        }
      );
    });
};

menu();
