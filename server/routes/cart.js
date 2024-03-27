const express = require("express");
const { findCart, createCart, addToCart } = require("../utils/utils");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

// Get Cart
router.get("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  console.log(cart);
  if (!cart) {
    return res.status(200).json({
      message: "New cart Created",
      cart: await createCart(id),
    });
  }
  res.status(200).json({
    message: "success",
    cart: cart,
  });
});

// Add to cart
router.post("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const { cartId, productId, quantity } = req.body;
  const cartItem = await addToCart(id, cartId, productId, quantity);
  res.status(201).json({
    message: "Item(s) added",
    cartItem: cartItem,
  });
});

// Update a product by id
router.put("/:id", verifyJWT, async (req, res) => {});

// Delete a product by id
router.delete("/:id", verifyJWT, async (req, res) => {});

module.exports = router;
