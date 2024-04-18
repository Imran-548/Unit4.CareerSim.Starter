const express = require("express");

const {
  findCart,
  createCart,
  addToCart,
  getCartItemsByCartId,
  updateCartProductById,
  updateCartById,
  deleteCart,
  findCartById,
} = require("../utils/utils");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/isAdmin");

// Get Cart
router.get("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  console.log("User ID: ", id);
  const getCart = await findCart(id);
  if (!getCart) {
    return res.status(200).json({
      message: "New cart Created",
      cart: await createCart(id),
      cartItems: [],
    });
  }
  const cart = await getCartItemsByCartId(getCart.id);
  res.status(200).json({
    message: "success",
    cart: cart,
  });
});

// Add to cart
router.post("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const { product_id, quantity } = req.body;
  console.log("Product ID: ", product_id);
  console.log("Quantity: ", quantity);
  const getCart = await findCart(id);
  if (!getCart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  const cartItem = await addToCart(getCart.id, product_id, quantity);
  const cart = await getCartItemsByCartId(getCart.id);
  res.status(201).json({
    message: "Item(s) added",
    cart: cart,
  });
});

// Update a product in cart by id
router.put("/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { product_id, quantity } = req.body;
  if (!id) {
    res.status(400).send("Product id is required");
    return;
  }
  const updatedCart = await updateCartById(id, product_id, quantity, user.id);
  const cart = await getCartItemsByCartId(getCart.id);
  res.status(200).json({
    message: "Cart updated",
    cartItem: updatedCart,
  });
});

router.patch("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  const { product_id, quantity } = req.body;

  const updatedCartProduct = await updateCartProductById(
    cart.id,
    product_id,
    quantity,
    id
  );

  res.status(200).json({
    message: "Cart updated",
    cartId: cart.id,
    cartItem: updatedCart,
  });
});

// Delete a cart by id
router.delete("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  if (!cart) {
    return res.status(404).send("Cart not found");
  }
  const deleted = await deleteCart(cart.id, cart.user_id);
  console.log("Deleted: ", deleted);
  res.status(200).json({
    message: "Cart deleted",
  });
});

module.exports = router;
