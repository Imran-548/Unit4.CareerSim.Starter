const express = require("express");
const {
  findProducts,
  createProduct,
  findProductById,
  deleteProduct,
} = require("../utils/utils");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  res.send(await findUsers());
});

// Create a new product
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, description, photos_url, price } = req.body;
  const newProduct = await createProduct(name, description, photos_url, price);
  res.status(201).json({
    message: "New product added",
    ...newProduct,
  });
});

// Update a product by id
router.put("/", (req, res) => {
  res.send("Hello From Auth!");
});

// Delete a product by id
ro;
uter.delete("/:id", async (req, res) => {
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
