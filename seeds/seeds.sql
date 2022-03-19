INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Engineering");
INSERT INTO department (name) VALUE ("Finance");
INSERT INTO department (name) VALUE ("Legal");
INSERT INTO role (title, salary, department_id) VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Account Manager", 160000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUE ("Lawyer", 190000, 4);
INSERT INTO employee (first_name, last_name, role_id) VALUE ("John", "Doe", 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Mike", "Chan", 1, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUE ("Ashley", "Rodriguez", 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Kevin", "Tupik", 3, 4);
INSERT INTO employee (first_name, last_name, role_id) VALUE ("Kunal", "Singh", 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Malia", "Brown", 5, 6);
INSERT INTO employee (first_name, last_name, role_id) VALUE ("Sarah", "Lourd", 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Tom", "Allen", 7, 8);
SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee;