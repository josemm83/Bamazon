DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL (10, 2) NULL,
    stock_quantity INT NULL,
    primary key(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES  ("Nintendo Switch", "Electronics", 299.99, 20),
("Litter Box", "Animals", 29.99, 15),
("Xbox One", "Electronics", 399.99, 35),
("Cat Food", "Animals", 12.99, 40),
("Diamond Bracelet", "Jewelry", 10999.99, 3),
("55 inch TV", "Electronics", 1499.99, 7),
("Mens wedding ring", "Jewelry", 150, 18),
("Wireless Headphones", "Electronics", 199.99, 24),
("Dog food", "Animals", 29.99, 42),
("Star Wars", "Movies", 34.99, 14);