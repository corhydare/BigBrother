INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Engineering");
INSERT INTO department (name) VALUE ("Finance");
INSERT INTO department (name) VALUE ("Legal");
-------------------------------
INSERT INTO role (title, salary, department_id) VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Lawyer", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Account Manager", 160000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Lawyer Assistant", 190000, 4);
--------------------------
SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee;