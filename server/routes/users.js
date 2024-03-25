const express = require("express");
const router = express.Router();
const { findUsers, findUserById, updateUserById } = require("../utils/utils");

// Get all users
router.get("/", async (req, res) => {
  res.status(200).send(await findUsers());
});

// Get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("User id is required");
    return;
  }
  res.status(200).send(await findUserById(id));
});

// Update User by Id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  if (!id) {
    res.status(400).send("User id is required");
    return;
  }
  const user = await findUserById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  await updateUserById(id, admin);
  res.status(200).json({
    message: "User updated",
  });
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
    res.status(404).send("User not found");
    return;
  }
  await deleteUserById(id);
  res.status(200).json({
    message: "Product deleted",
  });
});

module.exports = router;
