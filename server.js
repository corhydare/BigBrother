const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoletable = require("console.table");
const questions = require("./db/questions.js");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "a",
    database: "management_db",
  },
  console.log(`Connected to the management_db database.`),
  console.log(`

          .--'''''''''--.
       .'      .---.      '.
      /    .-----------.    '
     /        .-----.        |
     |       .-.   .-.       |
     |      /   | /   |      |
      '    | .-. | .-. |    /
       '-._| | | | | | |_.-'
           | '-' | '-' |
            '___/ '___/
         _.-'  /   '  '-._
       .' _.--|     |--._ '.
       ' _...-|     |-..._ '
              |     |
              '.___.'
                | |
               _| |_
              /|( )/'
             /  ' '  '
            | |     | |
            '-'     '-'
            | |     | |
            | |     | |
            | |-----| |
         .'/  |     | |/'.
         |    |     |    |
         '._.'| .-. |'._.'
               ' | /
               | | |
               | | |
               | | |
              /| | |'
            .'_| | |_'.
            '. | | | .'
         .    /  |  '    .
        /o'.-'  / '  '-.'o'
       /o  o' .'   '. /o  o'
       '.___.'       '.___.'

  `),

  beginSpying()
);
/////////////////////////////////////

function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      beginSpying();
    }
  );
}
///////////////////////////////
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      let roleId = selectRole().indexOf(val.role) + 1;
      let managerId = selectManager().indexOf(val.choice) + 1;
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          beginSpying();
        }
      );
    });
}
////////////////////////////////
function updateEmployee() {
  db.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      // console.log(res)
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function () {
              let lastName = [];
              for (let i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          let roleId = selectRole().indexOf(val.role) + 1;
          db.query(
            "UPDATE employee SET WHERE ?",
            {
              last_name: val.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(val);
              beginSpying();
            }
          );
        });
    }
  );
}
/////////////////////////////
function viewAllRoles() {
  db.query(
    "SELECT employee.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id ORDER BY department.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      beginSpying();
    }
  );
}
/////////////////

/////////////////////////////////////////
function viewAllDepartments() {
  db.query(
    "SELECT department.id as ID, department.name AS Department FROM department ORDER BY department.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      beginSpying();
    }
  );
}

/////////////////////////////////
let rArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      rArr.push(res[i].title);
    }
  });
  return rArr;
}
/////////////////////
let mArr = [];
function selectManager() {
  db.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        mArr.push(res[i].first_name);
      }
    }
  );
  return mArr;
}
///////////////////////
function addRole() {
  db.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              beginSpying();
            }
          );
        });
    }
  );
}
///////////////////////////////////
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      let query = db.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          beginSpying();
        }
      );
    });
}
//////////////////////////////////////////////
function beginSpying() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "Add Employee?",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Deparments",
          "Add Department?",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View All Employees?":
          viewAllEmployees();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Deparments":
          viewAllDepartments();
          break;

        case "Add Department?":
          addDepartment();
          break;
      }
    });
}
/////////////////////////////////////
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {});
