const express = require("express");
const { findCart, createCart } = require("../utils/utils");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

// Get Cart
router.get("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  if (!cart) {
    return res.status(200).json({
      message: "New cart Created",
      cart: await createCart(id),
    });
  }
  res.status.json({
    message: "success",
    cart: await findCart(req.user.id),
  });
});

// Add to cart
router.post("/", verifyJWT, async (req, res) => {
  const { id } = req.user;

  res.status(201).json({
    message: "New cart created",
    cart: newCart,
  });
});

// Update a product by id
router.put("/:id", isAdmin, async (req, res) => {});

// Delete a product by id
router.delete("/:id", isAdmin, async (req, res) => {});

module.exports = router;
