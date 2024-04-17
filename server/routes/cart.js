const express = require("express");
const {
  findCart,
  createCart,
  addToCart,
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
  console.log(updatedCart);
  res.status(200).json({
    message: "Cart updated",
    cartItem: updatedCart,
  });
});

router.patch("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  const { productId, quantity } = req.body;

  const updatedCartProduct = await updateCartProductById(
    cart.id,
    productId,
    quantity,
    id
  );
  console.log(updatedCart);
  res.status(200).json({
    message: "Cart updated",
    cartItem: updatedCart,
  });
});

// Delete a cart by id
router.delete("/", verifyJWT, async (req, res) => {
  const { id } = req.user;
  const cart = await findCart(id);
  if (!cart) {
    res.status(404).send("Cart not found");
    return;
  }
  await deleteCart(id);
  res.status(200).json({
    message: "Cart deleted",
  });
});

module.exports = router;
