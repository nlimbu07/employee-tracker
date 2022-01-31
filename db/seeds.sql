INSERT INTO department (name)
VALUES 
('Human Resorces'),
('Accounting'),
('IT Department'),
('Service');

INSERT INTO role (title, salary, department_id)
VALUES 
('HR Manager', 100000, 01),
('HR', 60000, 01),
('Account Manager', 120000, 02),
('Accountant', 80000, 02),
('IT Manager', 150000, 03),
('Software Developer', 110000, 03),
('Service Manager', 70000, 04),
('Service', 40000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('James', 'Fraser', 1, NULL),
('Jack', 'London', 2, 1),
('Robert', 'Bruce', 3, NULL),
('Peter', 'Greenaway', 4, 2),
('Derek', 'Jarman', 5, NULL),
('Paolo', 'Pasolini', 6, 5),
('Heathcote', 'Williams', 7, NULL),
('Sandy', 'Powell', 8, 4);