const inquirer = require("inquirer");
const mysql = require("mysql");

function main() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update Employees' role",
                "Quit"
            ],
            name: "choice",
        }, ])
        .then((answers) => {
            if (answers.choice === "View all employees") {
                viewEmployees();
            } else if (answers.choice === "View all departments") {
                viewDepartments();
            } else if (answers.choice === "View all roles") {
                viewRoles();
            } else if (answers.choice === "Add a department") {
                addDepartment();
            } else if (answers.choice === "Add a role") {
                newRole();
            } else if (answers.choice === "Add an employee") {
                newEmployee();
            } else if (answers.choice === "Update an Employees role") {
                updateEmployee();
            } else if (answers.choice === "Quit") {
                connection.end();
            } else {
                connection.end();
            }
        });
};

function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log()
        main();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
};

function addDepartment() {
    inquirer
        .prompt([{
            type: "prompt",
            message: "What is the name of the department you want to add?",
            name: "deptName",
        }, ])
        .then((answers) => {
            connection.query(
                `INSERT INTO department (name) values ('${answers.deptName}');`,
                function(err, res) {
                    if (err) throw err;
                    main();
                }
            );
        });
};

function newRole() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        newRolePrompts(res);
    });
}

function newRolePrompts(nDept) {
    console.log(nDept);
    inquirer
        .prompt([{
                type: "list",
                message: "What department is this role in?",
                name: "roleDept",
                choices: nDept,
            },
            {
                type: "prompt",
                message: "What is the name of this role?",
                name: "roleName",
            },
            {
                type: "prompt",
                message: "What is the salary for this role (gross)?",
                name: "roleSalary",
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let title = x[1];
            let salary = x[2];
            let dept = x[0];
            console.log(dept);
            console.log(title);
            console.log(salary);
            addRole(title, salary, dept);
        });
}

function addRole(title, salary, dept) {
    connection.query(
        `INSERT INTO role (title, salary, department_name) values ('${title}', '${salary}', '${dept}');`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

function newEmployee() {
    connection.query("SELECT * FROM role", function(err, res1) {
        if (err) throw err;

        connection.query(
            "SELECT * FROM employee WHERE employeeRole='Manager'",
            function(err, res2) {
                if (err) throw err;

                newEmpPrompts(res1, res2);
            }
        );
    });
}

function newEmpPrompts(nRole, nManager) {
    console.log(nRole);
    inquirer
        .prompt([{
                type: "prompt",
                message: "What is this employees first name?",
                name: "firstName",
            },
            {
                type: "prompt",
                message: "What is this employees last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "What role does this employee have?",
                name: "role",
                choices: nRole,
            },
            {
                type: "list",
                message: "Who is this employees manager?",
                name: "manager",
                choices: nManager,
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let fName = x[0];
            let lName = x[1];
            let role = x[2];
            let manager = x[3];
            console.log(fName);
            console.log(lName);
            console.log(role);
            console.log(manager);
            addEmp(fName, lName, role, manager);
        });
}

function addEmp(fName, lName, role, manager) {
    connection.query(
        `INSERT INTO employee (firstName, lastName, employeeRole, managerName) values ('${fName}', '${lName}', '${role}', '${manager}');`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

function updateEmployee() {
    connection.query("SELECT * FROM role", function(err, res1) {
        if (err) throw err;

        connection.query(
            "SELECT firstName lastName FROM employee",
            function(err, res2) {
                if (err) throw err;
                console.log(res2)
                updateEmpPrompts(res1, res2);
            }
        );
    });
}

function updateEmpPrompts(nChange, nUpdate) {
    console.log(nChange);
    inquirer
        .prompt([{
                type: "list",
                message: "Which employee would you like to update?",
                name: "empName",
                choices: nUpdate,
            },
            {
                type: "list",
                message: "What role are they changing to?",
                name: "role",
                choices: nChange,
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let fName = x[0];
            let role = x[1];
            console.log(fName)
            console.log(role)
            updateRole(fName, role);

        });
}

function updateRole(fName, role) {
    connection.query(
        `UPDATE employee SET employeeRole = '${role}' WHERE firstName = '${fName}';`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

module.exports = main;