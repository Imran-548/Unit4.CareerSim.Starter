const express = require("express");
const {
  findProducts,
  createProduct,
  findProductById,
  deleteProduct,
  updateProductById,
} = require("../utils/utils");
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");

// Get all products
router.get("/", async (req, res) => {
  res.send(await findProducts());
});

// Create a new product
router.post("/", isAdmin, async (req, res) => {
  console.log(req.user);
  const { name, description, photos_url, price } = req.body;
  const newProduct = await createProduct(name, description, photos_url, price);
  res.status(201).json({
    message: "New product added",
    ...newProduct,
  });
});

// Get a product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Product id is required");
    return;
  }
  const product = await findProductById(id);
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  res.status(200).json(product);
});

// Update a product by id
router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, photos_url, price } = req.body;
  if (!id) {
    res.status(400).send("Product id is required");
    return;
  }
  // Check if product exists
  const product = await findProductById(id);
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  const updatedProduct = await updateProductById(
    id,
    name,
    description,
    photos_url,
    price
  );
  res.status(200).json({
    message: "Product updated",
    product: updatedProduct,
  });
});

// Delete a product by id
router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Product id is required");
    return;
  }
  const product = await findProductById(id);
  console.log(product);
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  await deleteProduct(id);
  res.status(200).json({
    message: "Product deleted",
  });
});

module.exports = router;
