-- DATA DEFINITION QUERIES
-- queries to generate CBS database


DROP TABLE IF EXISTS cbs_customers;

CREATE TABLE cbs_customers (
	customer_id 		INT				AUTO_INCREMENT NOT NULL PRIMARY KEY,
    customer_firstname 	VARCHAR(25) 	NOT NULL,
    customer_lastname 	VARCHAR(25) 	NOT NULL,
    customer_address 	VARCHAR(25) 	NOT NULL,
    customer_city 		VARCHAR(25) 	NOT NULL,
    customer_zip		CHAR(10) 		NOT NULL,
    customer_phone		VARCHAR(25) 	NOT NULL
);

LOCK TABLES cbs_customers WRITE;
INSERT INTO cbs_customers (customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone)
VALUES
('Robert', 'Smith', '1530 North Ridge Ave', 'Sydney', '2039', '02-1234-5678'),
('Nathan', 'Butters', '34 Rock Stone Drive', 'Los Angeles', '90005', '213-123-4567'),
('Mary', 'Fields', '23A Summer Set Rd', 'Quebec', 'G0A 4V0', '418-123-4567');
UNLOCK TABLES;

DROP TABLE IF EXISTS cbs_orders;

CREATE TABLE cbs_orders (
	order_id			INT			AUTO_INCREMENT NOT NULL PRIMARY KEY,
    order_date			DATE 		NOT NULL,
    ship_date			DATE,
    customer_id			INT,
    ship_firstname		VARCHAR(25) NOT NULL,
    ship_lastname		VARCHAR(25) NOT NULL,
    ship_address		VARCHAR(25) NOT NULL,
    ship_city			VARCHAR(25) NOT NULL,
    ship_zip			CHAR(10) 	NOT NULL,
    ship_phone			VARCHAR(25) NOT NULL,
    order_subtotal		DEC(15, 2) 	NOT NULL,
    order_shipcost		DEC(15, 2) 	NOT NULL,
    order_totalcost		DEC(15, 2) 	NOT NULL,
    order_quantity		INT		 	NOT NULL,
	CONSTRAINT cbs_orders_ibfk_1 FOREIGN KEY (customer_id) REFERENCES cbs_customers (customer_id)
);

LOCK TABLES cbs_orders WRITE;
INSERT INTO cbs_orders (order_date, customer_id, ship_firstname, ship_lastname, ship_address, ship_city, ship_zip, ship_phone, order_subtotal, order_shipcost, order_totalcost, order_quantity)
VALUES
('2020-05-19', 1, 'Daniel', 'Runner', '135 South Gazelle Ct', 'Sydney', '2039', '12-3456-7890', 153.00, 4.99, 157.99, 6),
('2020-06-19', 2, 'Maggie', 'Bird', '20400 Rust Canyon St', 'Los Angeles', '90006', '213-555-5555', 2000.00, 4.99, 2004.99, 50),
('2020-07-19', 3, 'Francis', 'Poli', '4299 Kibble Road', 'Quebec', 'G0B 4V1', '418-999-9999', 23.00, 4.99, 27.99, 1);
UNLOCK TABLES;

DROP TABLE IF EXISTS cbs_products;

CREATE TABLE cbs_products (
	product_id			INT				AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name		VARCHAR(50) 	NOT NULL,
    product_description	VARCHAR(150) 	NOT NULL,
    product_roast		VARCHAR(25) 	NOT NULL,
    product_weight		DEC(5, 2) 		NOT NULL,
    product_price		DEC(5, 2) 		NOT NULL,
    product_stock		INT				NOT NULL
);

LOCK TABLES cbs_products WRITE;
INSERT INTO cbs_products (product_name, product_description, product_roast, product_weight, product_price, product_stock)
VALUES
('Italian Roast', 'A medium blend from the farmlands of Italy. This features hints of hazelnut and with a strong chocolate flavor.', 'MEDIUM', 30, 23.00, 100),
('San Francisco Roast', 'A dark bitter blend from the valleys of San Francisco. For those that enjoy a more intense coffee flavor.', 'DARK', 29, 15.00, 1000),
('Peruvian Roast', 'A smooth, light creamy blend from the mountainous regions of Peru. This features strong hints of vanilla and milk chocolate.', 'LIGHT', 32, 34.00, 10);
UNLOCK TABLES;

DROP TABLE IF EXISTS cbs_orderdetails;

CREATE TABLE cbs_orderdetails (
	order_id			INT			NOT NULL DEFAULT '0',
    product_id			INT			NOT NULL DEFAULT '0',
    product_quantity	INT			NOT NULL DEFAULT '0',
    CONSTRAINT cbs_orderdetails_ibfk_1 FOREIGN KEY (order_id) REFERENCES cbs_orders (order_id),
    CONSTRAINT cbs_orderdetails_ibfk_2 FOREIGN KEY (product_id) REFERENCES cbs_products (product_id)
);

-- TODO: think about how to set a 'constraint' to limit what product_quantity can be added corresponding to cbs_products.product_stock
-- it should reject if product_quantity being inserted is greater than cbs_products.product_stock
LOCK TABLES cbs_orderdetails WRITE;
INSERT INTO cbs_orderdetails (order_id, product_id, product_quantity)
VALUES
(1, 1, 99),
(2, 2, 4000),
(3, 3, 5);
UNLOCK TABLES;


DROP TABLE IF EXISTS cbs_farms;

CREATE TABLE cbs_farms (
	farm_id				INT				AUTO_INCREMENT not NULL PRIMARY KEY,
    farm_name			VARCHAR(50) 	NOT NULL,
    farm_region			VARCHAR(25) 	NOT NULL,
    farm_country		VARCHAR(25) 	NOT NULL
);

LOCK TABLE cbs_farms WRITE;
INSERT INTO cbs_farms (farm_name, farm_region, farm_country)
VALUES
('Main Street Coffee Farm', 'Central America', 'Guatemala'),
('La Granja de Café de La Gente', 'South America', 'Peru'),
('La Fattoria di Roma', 'Europe', 'Italy');
UNLOCK TABLES;

DROP TABLE IF EXISTS cbs_products_farms;

CREATE TABLE cbs_products_farms (
    product_id			INT 	NOT NULL DEFAULT '0',
	farm_id				INT		NOT NULL DEFAULT '0',
	CONSTRAINT cbs_products_farms_ibfk_1 FOREIGN KEY (product_id) REFERENCES cbs_products (product_id),
    CONSTRAINT cbs_products_farms_ibfk_2 FOREIGN KEY (farm_id) REFERENCES cbs_farms (farm_id)
);

LOCK TABLE cbs_products_farms WRITE;
INSERT INTO cbs_products_farms (product_id, farm_id)
VALUES
(1, 1),
(3, 2),
(2, 3);
UNLOCK TABLES;
