DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT(10) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

Select *
FROM products;

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (101, "shoes", "skateboarding", 69.99, 10),
    (202, "shirt", "skateboarding", 19.99, 15),
    (303, "pants", "skateboarding", 39.99, 15),
    (404, "trucks", "skateboarding", 29.99, 20),
    (505, "wheels", "skateboarding", 19.99, 40),
    (606, "bolts", "skateboarding", 9.99, 20),
    (707, "skateboard", "skateboarding", 59.99, 15),
    (808, "hats", "skateboarding", 19.99, 15),
    (909, "bearings", "skateboarding", 9.99, 40),
    (1001, "griptape", "skateboarding", 7.99, 20)