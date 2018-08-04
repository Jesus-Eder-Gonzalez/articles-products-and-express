\c postgres;

DROP DATABASE IF EXISTS articles_products;

DROP USER IF EXISTS articles_products_user;

CREATE USER articles_products_user WITH PASSWORD 'password';
CREATE DATABASE articles_products WITH OWNER articles_products_user;
