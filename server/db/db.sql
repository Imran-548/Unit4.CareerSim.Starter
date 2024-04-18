DROP TABLE IF EXISTS cartItems CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(225) NOT NULL,
    access_token TEXT,
    admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    photos_url TEXT ,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
    user_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cartItems (
    id BIGSERIAL UNIQUE,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT cart_id_product_id PRIMARY KEY (cart_id, product_id)
);

INSERT INTO products (name, description, photos_url, price) VALUES ('Product 1', 'Description 1', 'https://via.placeholder.com/150', 100.00);
INSERT INTO products (name, description, photos_url, price) VALUES ('Product 2', 'Description 2', 'https://via.placeholder.com/150', 200.00);
INSERT INTO products (name, description, photos_url, price) VALUES ('Product 3', 'Description 3', 'https://via.placeholder.com/150', 300.00);