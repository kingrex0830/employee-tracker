var inquirer = require('inquirer');
var connection = require('./db/connection.js');
var questions = [
    {
    type: 'list',
    message: "What do you want to do?",
    name: 'choice',
    choices: [
        {name: 'Departments', value: 'Departments'},
        {name: 'Add department', value: 'Add_dep'},
        // {name: 'Remove department', value: 'Rem_dep'},
        {name: 'Roles', value: 'Roles'},
        {name: 'Add role', value: 'Add_role'},
        {name: 'Employees', value: 'Employees'},
        {name: 'Add employee', value: 'Add_emp'},
        {name: 'Update emnployee role', value: 'Upd_emp_role'}
        ]
    }
];
// var departmentInput = [
//     {
//     type: 'input',
//     message: "Enter new department name:",
//     name: 'depInput',
//     }
// ];

function getAllDepartments() {
    var allDepartments;
    connection.promise().query(`select * from departments`).then(([rows]) => {allDepartments = rows;
    console.table(allDepartments)})
};

function addDepartments() {
    return inquirer
    .prompt ([
        {
            type: 'input',
            message: "Enter new department name:",
            name: 'depInput',
            }
    ])
    .then((response) => {
        connection.promise().query(`INSERT INTO departments (names) VALUES (?)`, response.depInput)
        .then(([rows]) => console.log(rows));
    })
};

function addRoles() {
    return inquirer
    .prompt ([
        {
            type: 'input',
            message: "Job title:",
            name: 'job_title',
        },
        {
            type: 'number',
            message: "Salary:",
            name: 'salary',
        },
        {
            type: 'number',
            message: "Department ID:",
            name: 'department_id',
        }
    ])
    .then((response) => {
        connection.promise().query(`INSERT INTO roles SET ?`, response)
        .then(([rows]) => console.log(rows));
    })
};

function addEmployees() {
    return inquirer
    .prompt ([
        {
            type: 'input',
            message: "First name:",
            name: 'first_name',
        },
        {
            type: 'input',
            message: "Last name:",
            name: 'last_name',
        }
    ])
    .then((response) => {
        connection.promise().query(`INSERT INTO employees SET ?`, response)
        .then(([rows]) => console.log(rows));
    })
};

// function removeDepartments() {
//     connection.promise().query(`SELECT departments.id, departments.names FROM departments`).then(([rows]) => {
//         let departments = rows;
//         const depChoices = departments.map(({id, names}) => ({
//             name: names,
//             value: id
//         }));
//         inquirer.prompt([{
//             type: 'list',
//             name: 'depRem',
//             message: "Remove department:",
//             choices: depChoices
//         }]).then((response) => {
//             connection.promise().query(`DELETE FROM departments WHERE id=?`, response.depRem)
//         })
//     })
// };

function getAllRoles() {
    var allRoles;
    connection.promise().query(`select * from roles`).then(([rows]) => {allRoles = rows;
    console.table(allRoles);});
};

function updateEmployeeRole() {
    var updEmpRole;
    connection.promise().query(`select roles.id, roles.job_title FROM roles`).then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({id, job_title}) => ({
            name: job_title,
            value: id
        }));
        inquirer.prompt([{
            type: 'list',
            name: 'modRole',
            message: "Assign role:",
            choices: roleChoices
        }]).then((response) => {
            let newRole = response.modRole;
            connection.promise().query(`select employees.id, employees.last_name FROM employees`).then(([rows]) => {
                let employees = rows;
                const employeeChoices = employees.map(({id, last_name}) => ({
                    name: last_name,
                    value: id
                }));
                inquirer.prompt([{
                    type: 'list',
                    name: 'pickEmp',
                    message: "Choose employee:",
                    choices: employeeChoices
                }]).then((response) => {
                    connection.promise().query(`update employees SET role_id=? WHERE id=?`, [newRole, response.pickEmp])
    })})})})};

function getAllEmployees() {
    var allEmployees;
    connection.promise().query(`select * from employees`).then(([rows]) => {allEmployees = rows;
    console.table(allEmployees);});
};

function startInit() {
    inquirer.prompt(questions).then(response => {
        if (response.choice === 'Departments') {
            getAllDepartments();
        };
        if (response.choice === 'Add_dep') {
            addDepartments();
        };
        // if (response.choice === 'Rem_dep') {
        //     removeDepartments();
        // };
        if (response.choice === 'Roles') {
            getAllRoles();
        };
        if (response.choice === 'Add_role') {
            addRoles();
        };
        if (response.choice === 'Employees') {
            getAllEmployees();
        };
        if (response.choice === 'Add_emp') {
            addEmployees();
        };
        if (response.choice === 'Upd_emp_role') {
            updateEmployeeRole();
        };
    })
};

startInit();