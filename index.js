const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cTable = require('console.table');
const db = require('./config/connection');
const router = express.Router();

const promptUser = () => {
     inquirer.prompt([
         {
             name: 'mainMenu',
             type: 'list',
             message: 'Select an option below',
             choices: [
                 'View all departments',
                 'View all roles',
                 'View all employees',
                 'Add a department',
                 'Add a role',
                 'Add an employee',
                 'Update an employee role',
                 'Update employee managers',
                 'View employees by manager',
                 'View employees by department',
                 'Delete departments',
                 'Delete roles',
                 'Delete employees',
                 'Quit'
             ]
         }
     ])
    
     .then((answers) => {
         const {choices} = answers;
         if (choices ==='View all departments') {viewAllDepartments();}
         if (choices ==='View all roles') {viewAllroles();}
         if (choices ==='View all employees') {viewAllemployees();}
         if (choices ==='Add a department') {addADepartment();}
         if (choices ==='Add a role') {addARole();}
         if (choices ==='Add a employee') {addAEmployee();}
         if (choices ==='Update an employee role') {updateAnEmployeerole();}
         if (choices ==='Update employee managers') {updateEmployeeManagers();}
         if (choices ==='View employees by department') {viewEmployeesByDepartment();}
         if (choices ==='Delete departments') {deleteDepartments();}
         if (choices ==='Delete roles') {deleteRoles();}
         if (choices ==='Delete employees') {deleteEmployees();}
         if (choices ==='Quit') {quit();}
     });
    }
    async function viewAllDepartments() {
        // SELECT * from department;
    
        let query = "SELECT * FROM department";
        const rows = await db.query(query);
        console.table(rows);
    }

    promptUser();