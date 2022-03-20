const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const db = require('./config/connection');

const connection = db;

connection.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    connection.query("SELECT * FROM employee WHERE first_name = 'Mabel'", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  
// const promptUser = () => {
//      inquirer.prompt([
//          {
//              name: 'mainMenu',
//              type: 'list',
//              message: 'Select an option below',
//              choices: [
//                  'View all departments',
//                  'View all roles',
//                  'View all employees',
//                  'Add a department',
//                  'Add a role',
//                  'Add an employee',
//                  'Update an employee role',
//                  'Update employee managers',
//                  'View employees by manager',
//                  'View employees by department',
//                  'Delete departments',
//                  'Delete roles',
//                  'Delete employees',
//                  'Quit'
//              ]
//          }
//      ])
    
    
//      .then((answers) => {
//          const {choices} = answers;
//          if (choices ==='View all departments') {viewAllDepartments();}
//          if (choices ==='View all roles') {viewAllroles();}
//          if (choices ==='View all employees') {viewAllemployees();}
//          if (choices ==='Add a department') {addADepartment();}
//          if (choices ==='Add a role') {addARole();}
//          if (choices ==='Add a employee') {addAEmployee();}
//          if (choices ==='Update an employee role') {updateAnEmployeerole();}
//          if (choices ==='Update employee managers') {updateEmployeeManagers();}
//          if (choices ==='View employees by department') {viewEmployeesByDepartment();}
//          if (choices ==='Delete departments') {deleteDepartments();}
//          if (choices ==='Delete roles') {deleteRoles();}
//          if (choices ==='Delete employees') {deleteEmployees();}
//          if (choices ==='Quit') {quit();}
//      });
    
//      function viewAllDepartments() {
//         let sql =       `SELECT department.id AS id, department.department_name AS department FROM department`;
//         connection.promise().query(sql, (error, response) => {
//           if (error) throw error;
//           console.table(response);
//           promptUser();
//         });
//       };
      
//       // View all Roles
//       const viewAllRoles = () => {
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         const sql =     `SELECT role.id, role.title, department.department_name AS department
//                         FROM role
//                         INNER JOIN department ON role.department_id = department.id`;
//         connection.promise().query(sql, (error, response) => {
//           if (error) throw error;
//             response.forEach((role) => {console.log(role.title);});
//             console.log(chalk.yellow.bold(`====================================================================================`));
//             promptUser();
//         });
//       };
      
//       // View all Departments
//       const viewAllDepartments = () => {
//         const sql =   `SELECT department.id AS id, department.department_name AS department FROM department`; 
//         connection.promise().query(sql, (error, response) => {
//           if (error) throw error;
//           console.log(chalk.yellow.bold(`====================================================================================`));
//           console.log(`                              ` + chalk.green.bold(`All Departments:`));
//           console.log(chalk.yellow.bold(`====================================================================================`));
//           console.table(response);
//           console.log(chalk.yellow.bold(`====================================================================================`));
//           promptUser();
//         });
//       };
      
//       // View all Employees by Department
//       const viewEmployeesByDepartment = () => {
//         const sql =     `SELECT employee.first_name, 
//                         employee.last_name, 
//                         department.department_name AS department
//                         FROM employee 
//                         LEFT JOIN role ON employee.role_id = role.id 
//                         LEFT JOIN department ON role.department_id = department.id`;
//         connection.query(sql, (error, response) => {
//           if (error) throw error;
//             console.log(chalk.yellow.bold(`====================================================================================`));
//             console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
//             console.log(chalk.yellow.bold(`====================================================================================`));
//             console.table(response);
//             console.log(chalk.yellow.bold(`====================================================================================`));
//             promptUser();
//           });
//       };
      
//       //View all Departments by Budget
//       const viewDepartmentBudget = () => {
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Budget By Department:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         const sql =     `SELECT department_id AS id, 
//                         department.department_name AS department,
//                         SUM(salary) AS budget
//                         FROM  role  
//                         INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
//         connection.query(sql, (error, response) => {
//           if (error) throw error;
//             console.table(response);
//             console.log(chalk.yellow.bold(`====================================================================================`));
//             promptUser();
//         });
//       };
//     }