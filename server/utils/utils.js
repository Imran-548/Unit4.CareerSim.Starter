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

const addToCart = async (cartId, productId, quantity) => {
  try {
    const { rows } = await client.query(
      "INSERT INTO cartItems (cart_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT cart_id_product_id DO UPDATE SET quantity = $3 RETURNING *",
      [cartId, productId, quantity]
    );
    return rows;
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
    const { rows } = await client.query(
      "SELECT id, name, description, photos_url, price FROM products "
    );
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
      "SELECT * FROM carts  WHERE user_id = $1",
      [user_id]
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const getCartItemsByCartId = async (cartId) => {
  try {
    const { rows } = await client.query(
      "SELECT cartItems.cart_id, cartItems.product_id, cartItems.quantity, products.name, products.price, products.photos_url FROM cartItems JOIN products ON cartItems.product_id = products.id WHERE cartItems.cart_id = $1",
      [cartId]
    );
    return rows;
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

const updateCartProductById = async (cartId, productId, quantity, id) => {
  try {
    const { rows } = await client.query(
      "UPDATE cartItems SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 AND user_id = $4 RETURNING *",
      [quantity, cartId, productId, id]
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

const deleteCart = async (cartId, userId) => {
  console.log(cartId, userId);
  try {
    const { rows } = await client.query(
      "DELETE FROM carts WHERE id = $1 AND user_id = $2  RETURNING *",
      [cartId, userId]
    );
    return rows[0];
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
  deleteCart,
  updateCartProductById,
  getCartItemsByCartId,
};

//change commits made
