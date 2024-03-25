const express = require("express");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  res.send(await findUsers());
});

// Get user by id
router.get("/", (req, res) => {
  res.send("Hello From Auth!");
});

// Update user
router.put("/", (req, res) => {
  res.send("Hello From Auth!");
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("User id is required");
    return;
  }
  const user = await findUserById(id);
  console.log(user);
  if (!user) {
    res.status(404).send("Product not found");
    return;
  }
  await deleteProduct(id);
  res.status(200).json({
    message: "Product deleted",
  });
});

module.exports = router;
