DROP DATABASE IF EXISTS challenge;
CREATE DATABASE challenge;
USE challenge;

CREATE TABLE departments (
    id INT auto_increment primary key,
    names varchar(50) unique
);
CREATE TABLE roles (
    id INT auto_increment primary key,
    job_title varchar(50) unique,
    salary INT,
    department_id INT,
    CONSTRAINT fk_department foreign key(department_id) references departments(id) ON DELETE CASCADE
);
CREATE TABLE employees (
    id INT auto_increment primary key,
    first_name varchar(50),
    last_name varchar(50),
    role_id INT,
    CONSTRAINT fk_role foreign key(role_id) references roles(id) ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager foreign key(manager_id) references employees(id) ON DELETE CASCADE
);