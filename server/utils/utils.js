const client = require("../config/pgClient");

const createUser = async (email, password) => {
  try {
    const user = await client.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    return user.rows[0];
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

const findUserByEmail = async (email) => {
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const findProducts = async () => {
  try {
    const products = await client.query("SELECT * FROM products");
    return products.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (name, description, photos_url, price) => {
  try {
    const user = await client.query(
      "INSERT INTO products (name, description, photos_url, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, photos_url, price]
    );
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const findProductById = async (id) => {
  try {
    const product = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return product.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return product.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const findUsers = async () => {
  try {
    const users = await client.query("SELECT * FROM users");
    return users.rows;
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
};

//change commits made
