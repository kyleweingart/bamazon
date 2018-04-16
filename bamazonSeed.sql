DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bar Stool", "Home", 50, 500), ("Desk", "Home", 300, 100),("Bed", "Home", 500, 50),("Television", "Electronics", 500, 100),
("Speakers", "Electronics", 200, 1000), ("Headphones", "Electronics", 5000, 50), ("Lawnmower", "Lawn & Garden", 150, 150),("Gas Grill", "Lawn & Garden", 250, 300),
("Tent", "Outdoors", 150, 500), ("Kayak", "Outdoors", 500, 50);





