const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const db = require("./config/connection");
const validate = require('./validate');
const { ORDER } = require("mysql/lib/PoolSelector");

const connection = db;

connection.connect((error) => {
  if (error) throw error;
      firstPrompt();
    });

function firstPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Select an option below",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "View employees by department",
        'View department budgets',
        "Delete departments",
        "Delete roles",
        "Delete employees",
        "Quit",
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllroles();
          break;
        case "View all employees":
          viewAllemployees();
          break;
        case "Add a department":
          addADepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee role":
          updateAnEmployeerole();
          break;
          case 'View employees by department':
            viewEmployeesByDepartment();
          break;
          case 'View department budgets':
            viewDepartmentBudget();
          break;
          case 'Delete departments':
            deleteDepartments();
          break;
          case 'Delete roles':
            deleteRoles();
          break;
          case 'Delete employees':
            deleteEmployees();
          break;
          case 'Quit':
          connection.end();
          break;
      }
    });
}
function viewAllDepartments() {
    console.log('All departments\n');
    var query = `SELECT DISTINCT d.id, d.name FROM department d`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      firstPrompt();
    });
  }

  function viewAllroles() {
    console.log('All roles\n');
    var query = `SELECT roles.id, roles.title, department.name AS department, roles.salary AS salary
    FROM roles INNER JOIN department ON roles.department_id = department.id`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      firstPrompt();
    });
  }

function viewAllemployees() {
    console.log('All employees\n');
    var query = `SELECT employee.id, employee.first_name, employee.last_name, 
    roles.title, department.name AS 'department', roles.salary
    FROM employee, roles, department 
    WHERE department.id = roles.department_id AND roles.id = employee.role_id 
    ORDER BY employee.id ASC`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      firstPrompt();
    });
  }

  const addADepartment = () => {
    inquirer
      .prompt([
        {
          name: 'newDepartment',
          type: 'input',
          message: 'Name of new department?',
          validate: validate.validateString
        }
      ])
      .then((answer) => {
        let sql = `INSERT INTO department (name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(`Department added`);
          viewAllDepartments();
        });
      });
};

const addARole = () => {
    const sql = 'SELECT * FROM department'
  connection.query(sql, (error, response) => {
      if (error) throw error;
      let deptNamesArray = [];
      response.forEach((department) => {deptNamesArray.push(department.name);});
      deptNamesArray.push('Create Department');
      inquirer
        .prompt([
          {
            name: 'departmentName',
            type: 'list',
            message: 'department of new role?',
            choices: deptNamesArray
          }
        ])
        .then((answer) => {
          if (answer.departmentName === 'Create Department') {
            this.addDepartment();
          } else {
            addRoleResume(answer);
          }
        });

      const addRoleResume = (departmentData) => {
        inquirer
          .prompt([
            {
              name: 'newRole',
              type: 'input',
              message: 'Name of new role?',
              validate: validate.validateString
            },
            {
              name: 'salary',
              type: 'input',
              message: 'Salary of new role?',
              validate: validate.validateSalary
            }
          ])
          .then((answer) => {
            let createdRole = answer.newRole;
            let departmentId;

            response.forEach((department) => {
              if (departmentData.departmentName === department.name) {departmentId = department.id;}
            });

            let sql =   `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            let crit = [createdRole, answer.salary, departmentId];

            connection.query(sql, crit, (error) => {
              if (error) throw error;
              console.log('Role created!');
              viewAllroles();
            });
          });
      };
    });
  };

  const addAnEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Employee first name?',
        validate: addFirstName => {
          if (addFirstName) {
              return true;
          } else {
              console.log('Enter a first name');
              return false;
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Employee last name?',
        validate: addLastName => {
          if (addLastName) {
              return true;
          } else {
              console.log('Enter a last name');
              return false;
          }
        }
      }
    ])
      .then(answer => {
      const crit = [answer.firstName, answer.lastName]
      const rolesSql = `SELECT roles.id, roles.title FROM roles`;
      connection.query(rolesSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: 'Employee role?',
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql =  `SELECT * FROM employee`;
                connection.query(managerSql, (error, data) => {
                  if (error) throw error;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
                      console.log('Employee added')
                      viewAllemployees();
                });
              });
            });
          });
       });
    });
  };

  const updateAnEmployeerole = () => {
    let sql =       `SELECT employee.id, employee.first_name, employee.last_name, roles.id AS "role_id"
                    FROM employee, roles, department WHERE department.id = roles.department_id AND roles.id = employee.role_id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      let sql =     `SELECT roles.id, roles.title FROM roles`;
      connection.query(sql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Choose employee?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'New role?',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            response.forEach((roles) => {
              if (answer.chosenRole === roles.title) {
                newTitleId = roles.id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });

            let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            connection.query(
              sqls,
              [newTitleId, employeeId],
              (error) => {
                if (error) throw error;
                console.log(`Employee updated`);
                viewAllemployees();
              }
            );
          });
      });
    });
  };

  const viewEmployeesByDepartment = () => {
    const sql =     `SELECT employee.first_name, 
                    employee.last_name, 
                    department.name AS department
                    FROM employee
                    LEFT JOIN roles ON employee.role_id = roles.id 
                    LEFT JOIN department ON roles.department_id = department.id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        console.log('Employees by Department:');
        console.table(response); 
        firstPrompt();
      });
  };
  
  const viewEmployeeManagers = () => {
    const sql =     `SELECT employee.first_name, 
                    employee.last_name, 
                    department.name AS department
                    FROM employee
                    LEFT JOIN roles ON employee.role_id = roles.id 
                    LEFT JOIN department ON roles.department_id = department.id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        console.log('Employees by Department:');
        console.table(response); 
        firstPrompt();
      });
  };
  const deleteEmployees = () => {
    let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    connection.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Employee to remove?',
            choices: employeeNamesArray
          }
        ])
        .then((answer) => {
          let employeeId;

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let sql = `DELETE FROM employee WHERE employee.id = ?`;
          connection.query(sql, [employeeId], (error) => {
            if (error) throw error;
            console.log(`Employee removed`);
            viewAllemployees();
          });
        });
    });
  };

  const deleteRoles = () => {
    let sql = `SELECT roles.id, roles.title FROM roles`;

    connection.query(sql, (error, response) => {
      if (error) throw error;
      let roleNamesArray = [];
      response.forEach((role) => {roleNamesArray.push(role.title);});

      inquirer
        .prompt([
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Role to remove?',
            choices: roleNamesArray
          }
        ])
        .then((answer) => {
          let roleId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              roleId = role.id;
            }
          });

          let sql =   `DELETE FROM roles WHERE roles.id = ?`;
          connection.query(sql, [roleId], (error) => {
            if (error) throw error;
            console.log(`Role removed`);
            viewAllroles();
          });
        });
    });
  };
  const deleteDepartments = () => {
    let sql =   `SELECT department.id, department.name FROM department`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
      let departmentNamesArray = [];
      response.forEach((department) => {departmentNamesArray.push(department.name);});

      inquirer
        .prompt([
          {
            name: 'chosenDept',
            type: 'list',
            message: 'Department to remove?',
            choices: departmentNamesArray
          }
        ])
        .then((answer) => {
          let departmentId;

          response.forEach((department) => {
            if (answer.chosenDept === department.name) {
              departmentId = department.id;
            }
          });

          let sql = `DELETE FROM department WHERE department.id = ?`;
          connection.query(sql, [departmentId], (error) => {
            if (error) throw error;
            console.log(`Department removed`);
            viewAllDepartments();
          });
        });
    });
};
const viewDepartmentBudget = () => {
    console.log('Budget By Department:');
    const sql =     `SELECT department_id AS id, 
                    department.name AS department,
                    SUM(salary) AS budget
                    FROM roles 
                    INNER JOIN department ON roles.department_id = department.id GROUP BY  roles.department_id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        console.table(response);
        firstPrompt();
    });
  };