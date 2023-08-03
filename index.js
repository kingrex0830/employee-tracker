var inquirer = require('inquirer');
var connection = require('./db/connection.js')
var questions = [
    {
    type: 'list',
    message: "What do you want to do?",
    name: 'choice',
    choices: [
        {name: 'Departments', value: 'Departments'},
        {name: 'Roles', value: 'Roles'},
        {name: 'Employees', value: 'Employees'},
        {name: 'Add department', value: 'Add_dep'},
        {name: 'Add role', value: 'Add_role'},
        {name: 'Add employee', value: 'Add_emp'},
        {name: 'Update emnployee role', value: 'Upd_emp_role'},
        ]
    }
];
var departmentInput = [
    {
    type: 'input',
    message: "Enter new department name:",
    name: 'depInput',
    }
];

function getAllDepartments() {
    var allDepartments;
    connection.promise().query('select * from departments').then(([rows]) => allDepartments = rows)
    console.table(allDepartments)
};

function addDepartments() {
    var newDepartment;
    inquirer.prompt(departmentInput).then(response => {
        connection.promise().query('INSERT INTO departments (name) VALUES (?)').then(([rows]) => newDepartment = rows);
    })
};

function getAllRoles() {
    var allRole;
    connection.promise().query('select * from roles').then(([rows]) => allRoles = rows);
    console.table(allRoles);
};

function getAllEmployees() {
    var allEmployees;
    connection.promise().query('select * from employees').then(([rows]) => allEmployees = rows);
    console.table(allEmployees);
};

function startInit() {
    inquirer.prompt(questions).then(response => {
        if (response.choice === 'Departments') {
            getAllDepartments();
        };
        if (response.choice === 'Add_dep') {
            addDepartments();
        };
        if (response.choice === 'Roles') {
            getAllRoles();
        };
        if (response.choice === 'Employees') {
            getAllEmployees();
        };
    })
};

startInit();

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role