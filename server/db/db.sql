DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(225),
    password VARCHAR(225),
    access_token VARCHAR(225)
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(225),
    description VARCHAR(225),
    photos_url TEXT,
    price DECIMAL(10,2)
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    product_id UUID,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

INSERT INTO products (name, description, photos_url, price) VALUES ('Product 1', 'Description 1', 'https://via.placeholder.com/150', 100.00);
INSERT INTO products (name, description, photos_url, price) VALUES ('Product 2', 'Description 2', 'https://via.placeholder.com/150', 200.00);
INSERT INTO products (name, description, photos_url, price) VALUES ('Product 3', 'Description 3', 'https://via.placeholder.com/150', 300.00);