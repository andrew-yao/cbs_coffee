-- DATA MANIPULATION QUERIES
-- queries to provide functionality to the CBS database
-- SELECT, INSERT, UPDATE, DELETE


-- DISPLAY ALL QUERIES

-- SELECT ALL FROM CUSTOMERS
SELECT * FROM cbs_customers;

-- SELECT ALL FROM ORDERS
SELECT * FROM cbs_orders;

-- SELECT ALL FROM ORDERDETAILS
SELECT * FROM cbs_orderdetails;

-- SELECT ALL FROM PRODUCTS
SELECT * FROM cbs_products;

-- SELECT ALL FROM FARMS
SELECT * FROM cbs_farms;

-- SELECT ALL FROM PRODUCTS_FARMS
SELECT * FROM cbs_products_farms;



-- SEARCH QUERIES
-- with colon : character to denote variable from user input

-- SEARCH CUSTOMERS 
SELECT * FROM cbs_customers 
WHERE customer_id = :idInput;

SELECT * FROM cbs_customers 
WHERE customer_firstname = :fnameInput;

SELECT * FROM cbs_customers 
WHERE customer_lastname = :lnameInput;

SELECT * FROM cbs_customers 
WHERE customer_address = :addressInput;

SELECT * FROM cbs_customers 
WHERE customer_city = :cityInput;

SELECT * FROM cbs_customers 
WHERE customer_zip = :zipInput;

SELECT * FROM cbs_customers 
WHERE customer_phone = :phoneInput;


-- SEARCH FARMS
SELECT * FROM cbs_farms 
WHERE farm_id = :idInput;

SELECT * FROM cbs_farms 
WHERE farm_name = :farmNameInput;

SELECT * FROM cbs_farms 
WHERE farm_region = :farmRegionInput;

SELECT * FROM cbs_farms 
WHERE farm_country = :farmCountryInput;


-- SEARCH PRODUCTS
SELECT * FROM cbs_products
WHERE product_id = :idInput;

SELECT * FROM cbs_products 
WHERE product_name = :productNameInput;

SELECT * FROM cbs_products
WHERE product_roast = :productRoastInput;

SELECT * FROM cbs_products
WHERE product_weight = :productWeightInput;

SELECT * FROM cbs_products
WHERE product_price = :productPriceInput;

SELECT * FROM cbs_products
WHERE product_stock = :productStockInput;



-- ADD QUERIES
-- with working examples

-- ADD PRODUCT
INSERT INTO cbs_products (product_name, product_description, product_roast, product_weight, product_price, product_stock)
VALUES
('Dark Roast', 'A dark and chocolately blend from Guatemala and Brazil', 'DARK', 24, 30.00, 100);

-- ADD FARM
INSERT INTO cbs_farms (farm_name, farm_region, farm_country)
VALUES
('Café Família', 'South America', 'Brazil');

-- ADD PRODUCTSFARMS
INSERT INTO cbs_products_farms (product_id, farm_id)
VALUES
(4, 4);

-- ADD CUSTOMER
INSERT INTO cbs_customers (customer_firstname, customer_lastname, customer_address, customer_city, customer_zip, customer_phone)
VALUES
('Roger', 'Peterson', '1120 South Arnold St', 'Seattle', '99000', '112-222-9192');

-- ADD ORDER
INSERT INTO cbs_orders (order_date, customer_id, ship_firstname, ship_lastname, ship_address, ship_city, ship_zip, ship_phone, order_subtotal, order_shipcost, order_totalcost, order_quantity)
VALUES
('2020-07-29', 4, 'Roger', 'Peterson', '1120 South Arnold St', 'Seattle', '99000', '112-222-9192', 10.00, 2.00, 12.00, 1);

-- ADD ORDER DETAILS
INSERT INTO cbs_orderdetails (order_id, product_id, product_quantity)
VALUES
(4, 2, 1);



-- DELETE QUERIES
-- with colon : character to denote variable from user input

-- DELETE CUSTOMER
DELETE FROM cbs_customers 
WHERE customer_id = :idInput;

-- DELETE ORDER
DELETE FROM cbs_orders 
WHERE order_id = :idInput;

-- DELETE ORDER DETAILS
DELETE FROM cbs_orderdetails 
WHERE order_id = :idInput;

-- DELETE PRODUCT
DELETE FROM cbs_products 
WHERE product_id = :idInput;

-- DELETE FARM
DELETE FROM cbs_farms 
WHERE farm_id = :idInput;

-- DELETE PRODUCTFARMS
DELETE FROM cbs_products_farms 
WHERE product_id = :idInput;


-- UPDATE QUERIES
-- with working examples

-- UPDATE PRODUCT
UPDATE cbs_products 
SET product_name='Extra Dark Roast'
WHERE product_name='Dark Roast';

UPDATE cbs_products 
SET product_stock = (product_stock - 1)
WHERE product_name='Extra Dark Roast';

-- UPDATE FARM
UPDATE cbs_farms 
SET farm_name = 'Café da Família'
WHERE farm_name='Café Família';



