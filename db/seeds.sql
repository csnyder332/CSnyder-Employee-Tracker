
-- data to populate tables
USE employees;

INSERT INTO department (name) 
VALUE ('Sales');
INSERT INTO department (name)
VALUE ('Finance');
INSERT INTO department (name) 
VALUE ('IT');
INSERT INTO department (name) 
VALUE ('Executive');

INSERT INTO role (title, salary, department_id) 
VALUE ('SalesManager', 75000.00, 1);
INSERT INTO roles (title, salary, department_id) 
VALUE ('SalesTeam', 50000.00, 1);
INSERT INTO roles (title, salary, department_id) 
VALUE ('Accountant', 100000.00, 2);
INSERT INTO roles (title, salary, department_id) 
VALUE ('SoftwareEngineer', 100000.00, 3);
INSERT INTO roles (title, salary, department_id) 
VALUE ('VicePresident', 125000.00, 4);
INSERT INTO roles (title, salary, department_id) 
VALUE ('President', 150000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Curtis', 'Sutter', 1, null),
('Dirk', 'Tawn', 2, null),
('Lisabeth', 'Iskowicz', 2, null),
('Gavan', 'Lednor', 1, null),
('Tressa', 'Rubinovitsch', 2, null),
('Lucila', 'Brummell', 1, null),
('Lyle', 'McQuaker', 2, null),
('Jacky', 'Jope', 1, null),
('Wally', 'Elves', 4, 1),
('Cherie', 'Liverock', 1, null),
('Brier', 'Wrankling', 3, 1),
('Tuckie', 'Greenhouse', 1, null),
('Darin', 'Stuchburie', 2, null),
('Julita', 'Scoon', 1, null),
('Ilario', 'Coupman', 1, null),
('Salomi', 'Laundon', 3, null),
('Dorette', 'Cohen', 1, null),
('Murry', 'Toomey', 1, 1),
('Christye', 'Frammingham', 1, null),
('Lenette', 'Hardey', 2, null),
('Devonne', 'Delmonti', 1, null),
('Adi', 'Ciardo', 3, 1),
('Dodi', 'Caldero', 2, 1),
('Lainey', 'Guerreiro', 1, null),
('Erin', 'Lannen', 2, null),
('Jamie', 'Mulliner', 2, null),
('Seth', 'Eisold', 2, 1),
('Orelle', 'Alltimes', 2, 1),
('Hunt', 'Poat', 3, 1),
('Letta', 'Sailor', 2, null),
('Editha', 'Farlambe', 2, null),
('Morie', 'Popelay', 2, null),
('Timmy', 'Franciottoi', 2, 1),
('Ardis', 'Asmus', 4, null),
('Coop', 'Flucks', 3, null),
('Sidonnie', 'Ech', 3, null),
('Mabel', 'Sproson', 3, null);
