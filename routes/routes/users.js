const express = require("express");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  res.send("Hello From Auth!");
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
router.delete("/", (req, res) => {
  res.send("Hello From Auth!");
});

module.exports = router;
