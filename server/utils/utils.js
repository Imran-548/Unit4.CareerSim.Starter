const client = require("../config/pgClient");
const isAdmin = require("../middleware/isAdmin");

// Creating things
const createUser = async (email, password) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (name, description, photos_url, price) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO products (name, description, photos_url, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, photos_url, price]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const createCart = async (userId) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [userId]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const addToCart = async (userId, cartId, productId, quantity) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO cartItems (user_id, cart_id, product_id, quantity) VALUES ($1,$2,$3,$4) RETURNING *",
      [userId, cartId, productId, quantity]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Finding Things

const findUserByEmail = async (email) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
const findUserById = async (id) => {
  try {
    const { rows } = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const findProducts = async () => {
  try {
    const { rows } = await client.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const findProductById = async (id) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const findUsers = async () => {
  try {
    const { rows } = await client.query("SELECT id,email,admin FROM users ");
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const findCart = async (user_id) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [user_id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Updating things

const updateCartById = async (cart_id, product_id, quantity, user_id) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO cartItems(cart_id, product_id, quantity, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = $3 RETURNING *",
      [cart_id, product_id, quantity, user_id]
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const updateToken = async (id, token) => {
  try {
    await client.query(
      `UPDATE users SET access_token = '${token}' WHERE id = '${id}'`
    );
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserById = async (id, admin) => {
  try {
    const { rows } = await client.query(
      "UPDATE users SET admin = $2 WHERE id = $1 RETURNING id,email, admin",
      [id, admin]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductById = async (id, name, description, photos_url, price) => {
  try {
    const { rows } = await client.query(
      "UPDATE products SET name = $2, description = $3, photos_url = $4, price = $5 WHERE id = $1 RETURNING *",
      [id, name, description, photos_url, price]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Deleting things

const deleteProduct = async (id) => {
  try {
    const { rows } = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserById = async (id) => {
  try {
    const { rows } = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  updateToken,
  findProducts,
  createProduct,
  findProductById,
  deleteProduct,
  findUsers,
  findUserById,
  deleteUserById,
  updateUserById,
  updateProductById,
  findCart,
  createCart,
  addToCart,
  updateCartById,
};

//change commits made
