INSERT INTO department (name) values ('Managers');
INSERT INTO department (name) values ('Servers');
INSERT INTO department (name) values ('Bussers');

INSERT INTO role (roleTitle, salary, department_id) values ('GM', 60000, 1);
INSERT INTO role (roleTitle, salary, department_id) values ('Server Supervisor', 40000, 2);
INSERT INTO role (roleTitle, salary, department_id) values ('Busser Supervisor', 28000, 3);

INSERT INTO employee (firstName, lastName, employeeRole, managerName) values ('John', 'Doe', 'GM', 'none');
INSERT INTO employee (firstName, lastName, employeeRole, managerName) values ('Jane', 'Doe', 'Server Supervisor', 'John Doe');
INSERT INTO employee (firstName, lastName, employeeRole, managerName) values ('Pete', 'Jones', 'Busser Supervisor', 'John Doe');

